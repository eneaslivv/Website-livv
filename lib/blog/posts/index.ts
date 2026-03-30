import { registerPosts } from "../utils"
import { clusterAWebflowSeo } from "./cluster-a-webflow-seo"
import { clusterBPlatformComparisons } from "./cluster-b-platform-comparisons"
import { clusterCFramerSeo } from "./cluster-c-framer-seo"
import { clusterDHiringAgencies } from "./cluster-d-hiring-agencies"
import { clusterETechnicalIntegration } from "./cluster-e-technical-integration"
import { clusterFCreativeEngineering } from "./cluster-f-creative-engineering"
import { clusterGIndustryGuides } from "./cluster-g-industry-guides"

// Register all cluster posts
registerPosts(clusterAWebflowSeo)
registerPosts(clusterBPlatformComparisons)
registerPosts(clusterCFramerSeo)
registerPosts(clusterDHiringAgencies)
registerPosts(clusterETechnicalIntegration)
registerPosts(clusterFCreativeEngineering)
registerPosts(clusterGIndustryGuides)

export {
  clusterAWebflowSeo,
  clusterBPlatformComparisons,
  clusterCFramerSeo,
  clusterDHiringAgencies,
  clusterETechnicalIntegration,
  clusterFCreativeEngineering,
  clusterGIndustryGuides,
}
