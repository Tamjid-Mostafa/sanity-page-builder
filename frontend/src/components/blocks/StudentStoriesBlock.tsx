"use client";

import React from "react";
import { motion } from "motion/react";
import { Quote, Target, Users, Globe2, Award, Briefcase, Heart } from "lucide-react";
import { PageBlocks } from "../BlocksRenderer";
import { urlFor } from "@/sanity/lib/image";

type StudentStoriesProps = Extract<PageBlocks, { _type: "studentStories" }>;

const iconMap = {
  Target,
  Users,
  Globe2,
  Award,
  Briefcase,
  Heart,
};

export default function StudentStoriesBlock(block: StudentStoriesProps) {
  const sectionTitle = block.sectionTitle || "Student Stories & Outcomes";
  const description = block.description || "";
  const testimonials = block.testimonials || [];
  const stats = block.stats || [];
  const backgroundColor = block.backgroundColor || "white";

  // Get background class
  const getBackgroundClass = () => {
    if (backgroundColor === "#EAE8DF") return "bg-[#EAE8DF]";
    if (backgroundColor === "#F5F5F5") return "bg-[#F5F5F5]";
    return "bg-white";
  };

  return (
    <section className={`py-20 md:py-24 lg:py-32 ${getBackgroundClass()}`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#383838] mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-2">
            {description}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {testimonials.map((testimonial, index) => {
            const avatarUrl = testimonial.avatar ? urlFor(testimonial.avatar).width(100).height(100).url() : null;

            return (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full p-10 rounded-3xl bg-[#EAE8DF] shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Quote Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm mb-6"
                  >
                    <Quote className="w-6 h-6 text-[#DBA19A]" fill="currentColor" />
                  </motion.div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl font-medium text-[#383838] mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className={`
                        w-12 h-12 rounded-full 
                        bg-gradient-to-br ${testimonial.avatarGradient || "from-[#233E5F] to-[#577A65]"}
                        flex items-center justify-center
                        text-white font-bold text-lg
                        shadow-md
                      `}
                    >
                      {testimonial.name?.charAt(0) || "S"}
                    </div>

                    {/* Details */}
                    <div>
                      <div className="font-heading font-bold text-[#383838]">
                        {testimonial.name}
                      </div>
                      <div className="text-sm">{testimonial.role}</div>
                      <div className="text-xs/70">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Target;
                const color = stat.color || "#233E5F";

                return (
                  <motion.div
                    key={`${stat.label}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4 transition-shadow duration-300 group-hover:shadow-xl"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color }}
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    <div className="text-3xl md:text-4xl font-heading font-bold text-[#383838] mb-2">
                      {stat.value}
                    </div>
                    <div className="text-base">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
