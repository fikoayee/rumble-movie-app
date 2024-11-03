import Recommendation from "../../interfaces/recommendation";

export interface RecommendationService {
  getRecommendations(): Promise<Recommendation[]>;
  acceptRecommendation(id: string): Promise<unknown>;
  rejectRecommendation(id: string): Promise<unknown>;
  resetRecommendationsStatus(): Promise<unknown>;
}
