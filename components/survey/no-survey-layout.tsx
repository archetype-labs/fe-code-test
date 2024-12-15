import { PageLayout } from "@/components/survey/page-layout";
import noResponsesIllustration from "@/assets/images/no-responses-illustration.jpg";

export function NoSurveyLayout() {
  return (
    <PageLayout
      content={
        <>
          <h1 className="text-3xl font-bold text-center">No survey found!</h1>

          <img
            src={noResponsesIllustration.src}
            className="w-2/4 mx-auto relative -bottom-12"
          />
        </>
      }
    />
  );
}
