import Recommendation from "../../../interfaces/recommendation";
import api from "../../infrastructure/axios-config";
import { RecommendationService } from "../recommendation.service";

export class RecommendationServiceImpl implements RecommendationService {
  private SERVICE_PATH_RECOMMENDATION = "/recommendations";

  async getRecommendations(): Promise<Recommendation[]> {
    try {
      const response: any = await api.get(
        `${this.SERVICE_PATH_RECOMMENDATION}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error on getting recommendations.");
    }
  }
  async acceptRecommendation(id: string): Promise<unknown> {
    try {
      const response: any = await api.put(
        `${this.SERVICE_PATH_RECOMMENDATION}/${id}/accept`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error on accepting recommendation.");
    }
  }
  async rejectRecommendation(id: string): Promise<unknown> {
    try {
      const response: any = await api.put(
        `${this.SERVICE_PATH_RECOMMENDATION}/${id}/reject`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error on rejecting recommendation.");
    }
  }
}
