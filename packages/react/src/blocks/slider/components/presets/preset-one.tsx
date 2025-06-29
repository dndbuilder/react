import CustomDot from "@/components/shared/custom-dot";
import CustomLeftArrow from "@/components/shared/custom-left-arrow";
import CustomRightArrow from "@/components/shared/custom-right-arrow";
import { SliderPresets, SliderSettingsProps } from "@/blocks/slider/types";
import { classNames } from "@/utils";
import { FC } from "react";
import SlickSlider from "react-slick";

const PresetOne: FC<SliderSettingsProps> = ({ settings, meta }) => {
  const locale = meta?.locale || "en";

  return (
    <SlickSlider
      dots={settings.showDots?.desktop}
      arrows={settings.showArrows?.desktop}
      infinite={settings.infinite?.desktop}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={settings.autoPlay?.desktop}
      autoplaySpeed={settings.autoplaySpeed?.desktop ?? 3000}
      pauseOnHover={settings.pauseOnHover?.desktop}
      nextArrow={<CustomRightArrow classes="text-white" />}
      prevArrow={<CustomLeftArrow classes="text-white" />}
      customPaging={() => <CustomDot />}
      className={classNames(
        settings.preset?.desktop ?? SliderPresets.Preset1,
        settings.navigation?.arrowPlacement?.desktop === "outside" && "arrows-outside",
        settings.navigation?.dotPlacement?.desktop === "outside" && "dots-outside"
      )}
    >
      {settings.slides?.map((slide, index) => {
        const title = slide.title?.[locale];

        const description = slide.description?.[locale];

        const buttonText = slide.button?.text?.[locale];

        return (
          <div key={index} className={`slide-item slide-item-${slide.id}`}>
            <div className="slide-content">
              {title && <div className="title" dangerouslySetInnerHTML={{ __html: title }}></div>}
              {description && (
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              )}
              {slide.button?.text && (
                <>
                  {slide.button?.link?.url ? (
                    <a
                      className="btn"
                      href={slide.button?.link?.url}
                      rel={slide.button?.link.nofollow ? "nofollow" : undefined}
                      target={slide.button?.link.newWindow ? "_blank" : undefined}
                    >
                      <span>{buttonText}</span>
                    </a>
                  ) : (
                    <button className="btn">
                      <span>{buttonText}</span>
                    </button>
                  )}
                </>
              )}
            </div>

            {slide.showBgOverlay?.desktop && <div className={`overlay`}></div>}
          </div>
        );
      })}
    </SlickSlider>
  );
};

export default PresetOne;
