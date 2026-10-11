"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface CaseStudyTrackerProps {
  projectSlug: string;
  locale: "sr" | "en";
  category?: string;
}

export function CaseStudyTracker({ projectSlug, locale, category }: CaseStudyTrackerProps) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent("view_case_study", {
        project_slug: projectSlug,
        locale,
        project_category: category,
      });
    }
  }, [projectSlug, locale, category]);

  return null;
}
