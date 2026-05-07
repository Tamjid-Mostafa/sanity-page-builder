"use client";

import { DesignBeforeDelivery } from "./DesignBeforeDelivery";
import { StructureWithFlexibility } from "./StructureWithFlexibility";
import { LearningEnvironments } from "./LearningEnvironments";
import { SafeguardingCare } from "./SafeguardingCare";
import { HumanLedTechHowWeWork } from "./HumanLedTech";
import { PartnershipsWithPurpose } from "./PartnershipsWithPurpose";
import { GrowingResponsibly } from "./GrowingResponsibly";

export function PrinciplesStack() {
  return (
    <div className="w-full">
      <DesignBeforeDelivery />
      <StructureWithFlexibility />
      <LearningEnvironments />
      <SafeguardingCare />
      <HumanLedTechHowWeWork />
      <PartnershipsWithPurpose />
      <GrowingResponsibly />
    </div>
  );
}
