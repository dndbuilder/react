"use client";

import CustomDot from "@/components/shared/custom-dot";
import CustomLeftArrow from "@/components/shared/custom-left-arrow";
import CustomRightArrow from "@/components/shared/custom-right-arrow";
import { BlockProps } from "@/types/block";
import { FC } from "react";
import SlickSlider from "react-slick";
import { TestimonialSettingsType } from "../types";
import TestimonialCard from "./testimonial-card";
import { SliderPresets as SliderPresets } from "@/blocks/slider/types";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint } from "@/store/selectors";

const Testimonial: FC<BlockProps<TestimonialSettingsType>> = ({ settings, meta }) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const columns =
    settings.columns?.[currentBreakpoint] ??
    settings.columns?.tablet ??
    settings.columns?.desktop ??
    1;
  if (settings.layout?.desktop === "grid") {
    return (
      <div className="testimonial">
        {settings.testimonials.map((t, i) => (
          <TestimonialCard data={t} key={i} settings={settings} meta={meta} />
        ))}
      </div>
    );
  }

  if (settings.layout?.desktop === "slider") {
    return (
      <SlickSlider
        arrows={settings.slider?.showArrows?.desktop}
        dots={settings.slider?.showDots?.desktop}
        infinite={settings.slider?.infinite?.desktop}
        slidesToShow={columns}
        rows={settings.rows?.desktop || 1}
        pauseOnHover={settings.slider?.pauseOnHover?.desktop}
        autoplay={settings.slider?.autoPlay?.desktop}
        autoplaySpeed={settings?.slider?.autoplaySpeed?.desktop || 3000}
        nextArrow={<CustomRightArrow />}
        prevArrow={<CustomLeftArrow />}
        customPaging={() => <CustomDot />}
        className={settings.slider?.preset?.desktop || SliderPresets.Preset1}
      >
        {settings.testimonials.map((t) => (
          <TestimonialCard data={t} key={t.id} settings={settings} meta={meta} />
        ))}
      </SlickSlider>
    );
  }
};

export default Testimonial;
