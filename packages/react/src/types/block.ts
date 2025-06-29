import { Theme } from "@/types/theme";
import { AnyObject } from "@/types";
import { Styles } from "free-style";
import { ComponentType } from "react";
import { ConnectDragPreview, ConnectDragSource } from "react-dnd";
import { BreakpointConfig, ResponsiveValue } from "./responsive";

import {
  AttributeType,
  BackgroundFieldType,
  BorderFieldType,
  BoxShadow,
  DisplayFieldType,
  PositionFieldType,
  SpacingValue,
  WithPseudoClass,
} from "./style";

export enum BlockType {
  HEADING = "heading",
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  LINK = "link",
  BUTTON = "button",
  CONTAINER = "container",
  SLIDER = "slider",
  HTML = "html",
  DROPDOWN = "dropdown",
  PRODUCT_GRID = "product-grid",
  CATEGORY_GRID = "category-grid",
  BRAND_GRID = "brand-grid",
  CATEGORY_LIST = "category-list",
  VENDOR_LIST = "vendor-list",
  TESTIMONIAL = "testimonial",
  FEATURE_BOX = "feature-box",
  BANNER = "banner",
  FAQ = "faq",
  ICON = "icon",
  FORM = "contact-form",
  MENU_DROPDOWN = "menu-dropdown",
  SITE_LOGO = "site-logo",
  AUTH_BOX = "auth-box",
  SEARCH_FORM = "search-form",
  CART = "cart",
  DRAWER = "drawer",
  CTA = "cta",
  SOCIAL_LINKS = "social-links",
  COLLECTION_GRID = "collection-grid",
  TABS = "tabs",
  PROGRESS_BAR = "progress-bar",
  PRICE_FILTER = "price-filter",
  RATING_FILTER = "rating-filter",
  AVAILABLITY_FILTER = "availablity-filter",
  BREADCRUMB = "breadcrumb",
  PRODUCT_IMAGE = "product-image",
  PRODUCT_TITLE = "product-title",
  PRODUCT_DESCRIPTION = "product-description",
  PRODUCT_RATING = "product-rating",
  PRODUCT_PRICE = "product-price",
  PRODUCT_STOCK_STATUS = "product-stock-status",
  PRODUCT_VENDOR = "product-vendor",
  PRODUCT_ADD_TO_CART = "product-add-to-cart",
  PRODUCT_SHARE = "product-share",
  PRODUCT_REVIEW = "product-review",
  PRODUCT_REVIEW_LIST = "product-review-list",
  RELATED_PRODUCTS = "related-products",
  BRAND_FILTER = "brand-filter",
}

export enum BlockGroup {
  BASIC = "Basic",
  LAYOUT = "Layout",
  ECOMMERCE = "Ecommerce",
  SITE = "Site",
  ADVANCED = "Advanced",
  TEMPLATE = "Template",
  TEMPLATE_PART = "Template Part",
  OTHERS = "Others",
}

export type Block<T extends object = AnyObject> = {
  id: string;
  type: string;
  settings: T;
  advancedSettings?: BlockAdvancedSettings;
  children: (string | Block)[];
  parentId: string;
};

export type BlockProps<T extends object = AnyObject> = Block<T> & {
  index: number;
  attributes: Record<string, string>;
  isEditable?: boolean;
  meta?: BlockMeta;
};

export type BlockConfig<T extends object = any /* @typescript-eslint/no-explicit-any */> = {
  type: string;
  label: string;
  icon?: ComponentType;
  previewImage?: string;
  component: ComponentType<BlockProps<T>>;
  previewComponent?: ComponentType<BlockProps<T>>;
  settings: T;
  advancedSettings?: BlockAdvancedSettings;
  style?: (params: {
    blockId: string;
    settings: T;
    themeSettings: Theme["settings"];
    breakpoints: BreakpointConfig[];
  }) => Styles;
  group?: BlockGroup;
  controls: BlockControl[];
  disableAdvancedSettings?: boolean;
  isVisible?: (params?: AnyObject) => boolean;
  toolbar?: ComponentType<BlockToolbarProps>;
};

export type BlockToolbarProps = {
  blockId: string;
  blockType: string;
  isSelected: boolean;
  dragRef: ConnectDragSource;
  previewRef: ConnectDragPreview;
  children?: React.ReactNode;
};

export type GroupConfig = {
  label: BlockGroup;
  order: number;
  isVisible?: (params?: AnyObject) => boolean;
};

export type PreviewBlockConfig<T extends object = any /* @typescript-eslint/no-explicit-any */> = {
  type: string;
  component: ComponentType<BlockProps<T>>;
};

export type BlockControl = {
  label: string;
  component: ComponentType;
};

export type DroppableBlock<T extends object = AnyObject> = {
  type: BlockType;
  settings: T;
  advancedSettings?: BlockAdvancedSettings;
};

export type MoveableBlock = {
  id: string;
  parentId: string;
  index: number;
};

export type BlockAdvancedSettings = {
  border?: BorderFieldType;
  boxShadow?: WithPseudoClass<BoxShadow>;
  // Spacing types
  margin?: ResponsiveValue<SpacingValue>;
  padding?: ResponsiveValue<SpacingValue>;
  // Layout types
  display?: DisplayFieldType;
  position?: PositionFieldType;
  zIndex?: ResponsiveValue<number>;
  // Responsive types
  hideOnDesktop?: boolean;
  hideOnTablet?: boolean;
  hideOnMobile?: boolean;
  // Advanced types
  cssId?: string;
  cssClasses?: string;
  customCss?: string;
  customAttributes?: AttributeType[];
  background?: BackgroundFieldType;

  // Flex types
  order?: ResponsiveValue<number>;
  orderCustom?: ResponsiveValue<number>;
  alignSelf?: ResponsiveValue<string>;
  size?: ResponsiveValue<string>;
  grow?: ResponsiveValue<number>;
  shrink?: ResponsiveValue<number>;
};

export type BlockMeta = {
  locale: string;
};

export type LinkType = {
  url?: string;
  newWindow?: boolean;
  nofollow?: boolean;
  attributes?: string;
};

export type IconType = {
  iconSet: string;
  iconName: string;
};
