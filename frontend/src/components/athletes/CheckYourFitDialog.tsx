"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, ChevronLeft, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldLegend,
  FieldTitle,
  FieldGroup,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { submitFitForm } from "@/app/athletes/actions";

// ─── Schema ─────────────────────────────────────────────────────────────────

const schema = z.object({
  parentName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  childAge: z.enum(["13-14", "15-16", "17-18", "other"]),
  childAgeOther: z.string().optional(),
  location: z.enum(["spain", "uk", "europe-other", "middle-east", "other"]),
  locationOther: z.string().optional(),
  studyMode: z.enum(["in-person", "online", "mix", "not-sure"]),
  currentAcademics: z.enum([
    "traditional",
    "online",
    "hybrid",
    "not-engaged",
    "other",
  ]),
  currentAcademicsOther: z.string().optional(),
  mainChallenge: z.enum([
    "motivation",
    "too-rigid",
    "sport-balance",
    "not-challenged",
    "other",
  ]),
  mainChallengeOther: z.string().optional(),
  englishLevel: z.enum([
    "native-fluent",
    "comfortable",
    "some-difficulty",
    "beginner",
  ]),
  startTiming: z.enum(["immediately", "3-months", "next-year", "not-sure"]),
  hearAboutUs: z.enum([
    "recommendation",
    "google",
    "ai",
    "telegram",
    "facebook",
    "instagram",
    "tiktok",
    "google-maps",
    "other",
  ]),
  referral: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// ─── Step definitions ────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    label: "Contact",
    title: "Let's start with your details",
    subtitle: "We only reach out to families who might be a strong fit.",
    fields: ["parentName", "email", "phone"] as (keyof FormData)[],
  },
  {
    id: 2,
    label: "About your child",
    title: "Tell us about your child",
    subtitle: "This helps us understand whether our programme is the right match.",
    fields: [
      "childAge",
      "childAgeOther",
      "location",
      "locationOther",
      "studyMode",
    ] as (keyof FormData)[],
  },
  {
    id: 3,
    label: "Academic background",
    title: "Their academic situation",
    subtitle: "Be honest — this helps us give you an accurate assessment.",
    fields: [
      "currentAcademics",
      "currentAcademicsOther",
      "mainChallenge",
      "mainChallengeOther",
      "englishLevel",
    ] as (keyof FormData)[],
  },
  {
    id: 4,
    label: "Timing",
    title: "One last thing",
    subtitle: "Tell us when you'd like to start and how you found us.",
    fields: ["startTiming", "hearAboutUs", "referral"] as (keyof FormData)[],
  },
];

// ─── Main dialog ─────────────────────────────────────────────────────────────

interface CheckYourFitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckYourFitDialog({
  open,
  onOpenChange,
}: CheckYourFitDialogProps) {
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const current = STEPS[step];

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    shouldFocusError: true,
    reValidateMode: "onChange",
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      childAge: undefined,
      childAgeOther: "",
      location: undefined,
      locationOther: "",
      studyMode: undefined,
      currentAcademics: undefined,
      currentAcademicsOther: "",
      mainChallenge: undefined,
      mainChallengeOther: "",
      englishLevel: undefined,
      startTiming: undefined,
      hearAboutUs: undefined,
      referral: "",
    },
  });

  const watchChildAge = form.watch("childAge");
  const watchLocation = form.watch("location");
  const watchCurrentAcademics = form.watch("currentAcademics");
  const watchMainChallenge = form.watch("mainChallenge");

  const handleNext = async () => {
    const valid = await form.trigger(current.fields);
    if (!valid) {
      const { errors } = form.formState;
      const firstInvalid = current.fields.find((name) => errors[name]);
      if (firstInvalid) {
        requestAnimationFrame(() => {
          const el = document.getElementById(`field-${firstInvalid}`);
          if (!el) return;

          // Focus the first focusable element inside (works for text inputs)
          const focusable = el.querySelector<HTMLElement>(
            "input, textarea, button, select, [tabindex]",
          );
          focusable?.focus({ preventScroll: true });

          // Manually scroll the Radix ScrollArea viewport
          const viewport = document.querySelector<HTMLElement>(
            "[data-radix-scroll-area-viewport]",
          );
          if (viewport) {
            const elTop = el.getBoundingClientRect().top;
            const vpTop = viewport.getBoundingClientRect().top;
            viewport.scrollTo({
              top: viewport.scrollTop + elTop - vpTop - 16,
              behavior: "smooth",
            });
          }
        });
      }
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError(null);
    const result = await submitFitForm(data);
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setSubmitted(false);
        setServerError(null);
        form.reset();
      }, 300);
    }
    onOpenChange(isOpen);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "dark max-w-lg w-full p-0 overflow-hidden text-foreground",
          "bg-card border border-foreground/10 shadow-2xl shadow-black/50",
          "rounded-2xl max-h-[95dvh] sm:max-h-[85dvh]",
        )}
        data-lenis-prevent
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Check Your Fit — iCollege Athletes</DialogTitle>
          <DialogDescription>
            A short form to help us understand whether iCollege Athletes is the
            right fit for your child.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          // ── Success ────────────────────────────────────────────────────────
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-6 px-8 py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                Thank you for reaching out
              </h2>
              <p className="text-foreground/55 text-sm leading-relaxed max-w-xs mx-auto">
                We have received your details and will review your submission.
                If it looks like a strong fit, we will be in touch to arrange a
                conversation.
              </p>
            </div>
            <Button
              onClick={() => handleClose(false)}
              className="mt-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-11 font-semibold"
            >
              Close
            </Button>
          </motion.div>
        ) : (
          // ── Form ───────────────────────────────────────────────────────────
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col h-full max-h-[95dvh] sm:max-h-[85dvh]"
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="relative px-6 pt-6 pb-5 shrink-0 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/8 via-transparent to-transparent" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 items-center">
                    {STEPS.map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          width: i === step ? 24 : 8,
                          opacity: i <= step ? 1 : 0.25,
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "block h-1.5 rounded-full",
                          i <= step ? "bg-primary" : "bg-foreground/20",
                        )}
                        style={{ width: i === step ? 24 : 8 }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-foreground/40 tabular-nums tracking-wide uppercase">
                    Step {step + 1} / {STEPS.length}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-[0.15em] mb-1.5">
                    {current.label}
                  </p>
                  <h2 className="text-xl font-bold text-foreground leading-tight tracking-tight">
                    {current.title}
                  </h2>
                  <p className="text-sm text-foreground/50 mt-1">
                    {current.subtitle}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 h-px bg-foreground/8" />
            </div>

            {/* ── Body ───────────────────────────────────────────────────── */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-6 py-5">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* ── STEP 1 ─────────────────────────────────────────── */}
                    {step === 0 && (
                      <FieldGroup>
                        <Controller
                          name="parentName"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field id={`field-${field.name}`} data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                Parent / Guardian Full Name{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLabel>
                              <Input
                                {...field}
                                id={field.name}
                                placeholder="e.g. Sarah Johnson"
                                autoComplete="name"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="email"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field id={`field-${field.name}`} data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                Email Address{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLabel>
                              <Input
                                {...field}
                                id={field.name}
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="phone"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field id={`field-${field.name}`} data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                Phone Number{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLabel>
                              <Input
                                {...field}
                                id={field.name}
                                type="tel"
                                placeholder="+34 600 000 000"
                                autoComplete="tel"
                                aria-invalid={fieldState.invalid}
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    )}

                    {/* ── STEP 2 ─────────────────────────────────────────── */}
                    {step === 1 && (
                      <FieldGroup>
                        <Controller
                          name="childAge"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                How old is your child?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-2"
                              >
                                {[
                                  { v: "13-14", l: "13 – 14" },
                                  { v: "15-16", l: "15 – 16" },
                                  { v: "17-18", l: "17 – 18" },
                                  { v: "other", l: "Other" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`childAge-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`childAge-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {watchChildAge === "other" && (
                                <Input
                                  {...form.register("childAgeOther")}
                                  placeholder="Please specify"
                                  className="mt-1"
                                />
                              )}
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />

                        <Controller
                          name="location"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                Where is your child currently based?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-2"
                              >
                                {[
                                  { v: "spain", l: "Spain" },
                                  { v: "uk", l: "UK" },
                                  { v: "europe-other", l: "Europe (other)" },
                                  { v: "middle-east", l: "Middle East" },
                                  { v: "other", l: "Other" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`location-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`location-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {watchLocation === "other" && (
                                <Input
                                  {...form.register("locationOther")}
                                  placeholder="Please specify"
                                  className="mt-1"
                                />
                              )}
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />

                        <Controller
                          name="studyMode"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                How would you ideally like your child to study?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col gap-2"
                              >
                                {[
                                  { v: "in-person", l: "Primarily in-person in Barcelona" },
                                  { v: "online", l: "Fully online" },
                                  { v: "mix", l: "A mix of both" },
                                  { v: "not-sure", l: "Not sure yet" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`studyMode-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`studyMode-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />
                      </FieldGroup>
                    )}

                    {/* ── STEP 3 ─────────────────────────────────────────── */}
                    {step === 2 && (
                      <FieldGroup>
                        <Controller
                          name="currentAcademics"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                What is your child currently doing academically?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col gap-2"
                              >
                                {[
                                  { v: "traditional", l: "Traditional school" },
                                  { v: "online", l: "Online school" },
                                  { v: "hybrid", l: "Hybrid / flexible learning" },
                                  { v: "not-engaged", l: "Not currently engaged" },
                                  { v: "other", l: "Other" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`currentAcademics-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`currentAcademics-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {watchCurrentAcademics === "other" && (
                                <Input
                                  {...form.register("currentAcademicsOther")}
                                  placeholder="Please specify"
                                  className="mt-1"
                                />
                              )}
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />

                        <Controller
                          name="mainChallenge"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                What is the main challenge your child is facing right now?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col gap-2"
                              >
                                {[
                                  { v: "motivation", l: "Lack of motivation" },
                                  { v: "too-rigid", l: "School is too rigid or restrictive" },
                                  { v: "sport-balance", l: "Difficulty balancing sport and academics" },
                                  { v: "not-challenged", l: "Not being challenged enough" },
                                  { v: "other", l: "Other" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`mainChallenge-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`mainChallenge-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {watchMainChallenge === "other" && (
                                <Input
                                  {...form.register("mainChallengeOther")}
                                  placeholder="Please specify"
                                  className="mt-1"
                                />
                              )}
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />

                        <Controller
                          name="englishLevel"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                How comfortable is your child working in English academically?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-col gap-2"
                              >
                                {[
                                  { v: "native-fluent", l: "Fully comfortable (native / fluent)" },
                                  { v: "comfortable", l: "Comfortable in most situations" },
                                  { v: "some-difficulty", l: "Some difficulty (would need English support)" },
                                  { v: "beginner", l: "Beginner (would need considerable support)" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`englishLevel-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`englishLevel-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />
                      </FieldGroup>
                    )}

                    {/* ── STEP 4 ─────────────────────────────────────────── */}
                    {step === 3 && (
                      <FieldGroup>
                        <Controller
                          name="startTiming"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                When would you ideally like to start?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-2"
                              >
                                {[
                                  { v: "immediately", l: "Immediately" },
                                  { v: "3-months", l: "Within 3 months" },
                                  { v: "next-year", l: "Next academic year" },
                                  { v: "not-sure", l: "Not sure yet" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`startTiming-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`startTiming-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />

                        <Controller
                          name="hearAboutUs"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FieldSet id={`field-${field.name}`}>
                              <FieldLegend variant="label">
                                How did you first hear about iCollege Athletes?{" "}
                                <span className="text-primary font-normal">*</span>
                              </FieldLegend>
                              <RadioGroup
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-2"
                              >
                                {[
                                  { v: "recommendation", l: "Recommendation" },
                                  { v: "google", l: "Google search" },
                                  { v: "ai", l: "AI (ChatGPT, Gemini…)" },
                                  { v: "telegram", l: "Telegram" },
                                  { v: "facebook", l: "Facebook" },
                                  { v: "instagram", l: "Instagram" },
                                  { v: "tiktok", l: "TikTok" },
                                  { v: "google-maps", l: "Google Maps" },
                                  { v: "other", l: "Other" },
                                ].map(({ v, l }) => (
                                  <FieldLabel key={v} htmlFor={`hearAboutUs-${v}`}>
                                    <Field
                                      orientation="horizontal"
                                      data-invalid={fieldState.invalid}
                                    >
                                      <FieldTitle>{l}</FieldTitle>
                                      <RadioGroupItem
                                        value={v}
                                        id={`hearAboutUs-${v}`}
                                        aria-invalid={fieldState.invalid}
                                      />
                                    </Field>
                                  </FieldLabel>
                                ))}
                              </RadioGroup>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </FieldSet>
                          )}
                        />

                        <Field>
                          <FieldLabel htmlFor="referral">
                            If someone referred you, who was it?{" "}
                            <span className="text-foreground/35 font-normal">
                              (optional)
                            </span>
                          </FieldLabel>
                          <Input
                            {...form.register("referral")}
                            id="referral"
                            placeholder="Their name or relationship"
                          />
                        </Field>

                        {serverError && (
                          <p className="text-sm text-destructive rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3">
                            {serverError}
                          </p>
                        )}
                      </FieldGroup>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <ScrollBar
                orientation="vertical"
                className="w-1.5 p-px *:data-[slot=scroll-area-thumb]:bg-foreground/15 hover:*:data-[slot=scroll-area-thumb]:bg-foreground/30"
              />
            </ScrollArea>

            {/* ── Footer ─────────────────────────────────────────────────── */}
            <div className="relative px-5 py-4 shrink-0 flex items-center justify-between gap-3">
              <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-foreground/8" />

              {step > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  className="text-foreground/50 hover:text-foreground hover:bg-foreground/6 rounded-xl gap-1.5 px-3 h-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10 font-semibold gap-2 ml-auto"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10 font-semibold gap-2 ml-auto disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
