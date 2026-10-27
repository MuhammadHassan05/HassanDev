/**
 * Map from illustration key (stored on each project in src/content/projects.ts)
 * to its component. Typed as a Record over every key, so the typecheck fails
 * if an illustration is added to the content without a component.
 */
import type { ComponentType } from "react";
import type { IllustrationKey } from "@/content/illustrations";
import { AiTextDetectionApiIllustration } from "./AiTextDetectionApi";
import { AlGhaniMartIllustration } from "./AlGhaniMart";
import { CattleExchangePlatformIllustration } from "./CattleExchangePlatform";
import { CityPulseIllustration } from "./CityPulse";
import { CnnVsTransformerDroneDetectionIllustration } from "./CnnVsTransformerDroneDetection";
import { DograTechnologiesIllustration } from "./DograTechnologies";
import { ElevvoPathwayIllustration } from "./ElevvoPathway";
import { FlatterlabTechIllustration } from "./FlatterlabTech";
import { HoodaysStreetwearIllustration } from "./HoodaysStreetwear";
import { JaibExpenseTrackerIllustration } from "./JaibExpenseTracker";
import { OnePlaceCanadaIllustration } from "./OnePlaceCanada";
import { PikzelsIllustration } from "./Pikzels";
import { ReDishCrmIllustration } from "./ReDishCrm";
import { ShopifyToGalaxyMiddlewareIllustration } from "./ShopifyToGalaxyMiddleware";
import { SonOfOakIllustration } from "./SonOfOak";
import { TalentMinerIllustration } from "./TalentMiner";
import { TevarIdentityIllustration } from "./TevarIdentity";
import { TheMCShopIllustration } from "./TheMCShop";
import { TinyOwletsIllustration } from "./TinyOwlets";
import type { IllustrationProps } from "./types";
import { VtestIllustration } from "./Vtest";
import { WriteWiselyAiIllustration } from "./WriteWiselyAi";
import { YettiAiIllustration } from "./YettiAi";
import { YicSocialMediaIllustration } from "./YicSocialMedia";
import { ZarQaisECommerceIllustration } from "./ZarQaisECommerce";

export type { IllustrationProps } from "./types";

/** Illustration component for every illustration key. */
export const illustrations: Record<IllustrationKey, ComponentType<IllustrationProps>> = {
  "ai-text-detection-api": AiTextDetectionApiIllustration,
  "al-ghani-mart": AlGhaniMartIllustration,
  "cattle-exchange-platform": CattleExchangePlatformIllustration,
  "city-pulse": CityPulseIllustration,
  "cnn-vs-transformer-drone-detection": CnnVsTransformerDroneDetectionIllustration,
  "dogra-technologies": DograTechnologiesIllustration,
  "elevvo-pathway": ElevvoPathwayIllustration,
  "flatterlab-tech": FlatterlabTechIllustration,
  "hoodays-streetwear": HoodaysStreetwearIllustration,
  "jaib-expense-tracker": JaibExpenseTrackerIllustration,
  "oneplace-canada": OnePlaceCanadaIllustration,
  pikzels: PikzelsIllustration,
  "redish-crm": ReDishCrmIllustration,
  "shopify-to-galaxy-middleware": ShopifyToGalaxyMiddlewareIllustration,
  "son-of-oak": SonOfOakIllustration,
  talentminer: TalentMinerIllustration,
  "tevar-identity": TevarIdentityIllustration,
  themcshop: TheMCShopIllustration,
  "tiny-owlets": TinyOwletsIllustration,
  vtest: VtestIllustration,
  "writewisely-ai": WriteWiselyAiIllustration,
  "yetti-ai": YettiAiIllustration,
  "yic-social-media": YicSocialMediaIllustration,
  "zarqais-e-commerce": ZarQaisECommerceIllustration,
};
