import Recommendation from "../interfaces/recommendation";
import { RecommendationServiceImpl } from "../services/datasources/impl/recommendation.service.impl";
import { simulateDelay } from "../utils/simulate-delay.util";

const recommendationService = new RecommendationServiceImpl();

export const useRecommendation = () => {
  const getRecommendations = async () => {
    try {
      const response: Recommendation[] =
        await recommendationService.getRecommendations();
      await simulateDelay(1500); // simulate waiting time for api call
      return response;
    } catch (error) {
      return null;
    }
  };
  const acceptRecommendation = async (id: string) => {
    try {
      const response: any = await recommendationService.acceptRecommendation(
        id
      );
      await simulateDelay();
      return response;
    } catch (error) {
      return null;
    }
  };
  const rejectRecommendation = async (id: string) => {
    try {
      const response: any = await recommendationService.rejectRecommendation(
        id
      );
      await simulateDelay();
      return response;
    } catch (error) {
      return null;
    }
  };
  const resetRecommendationsStatus = async () => {
    try {
      const response: any =
        await recommendationService.resetRecommendationsStatus();
      await simulateDelay();
      return response;
    } catch (error) {
      return null;
    }
  };
  return {
    getRecommendations,
    acceptRecommendation,
    rejectRecommendation,
    resetRecommendationsStatus,
  };
};
