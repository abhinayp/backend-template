import { Injectable, Logger } from "@nestjs/common";
import { CartDTO } from "../dto/cart.dto";
import { KafkaContext } from "@nestjs/microservices";
@Injectable()
export class CartTopic {
  private readonly logger = new Logger("CartTopic");

  constructor() { }

  async updateMetrics(data: CartDTO, context: KafkaContext) {
    this.logger.log(data.user_count);
    this.logger.log(data.product_id);
  }
}
