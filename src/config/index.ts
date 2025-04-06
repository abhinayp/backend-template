import { ConfigModule } from "@nestjs/config";
import development from "./development";

const config = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return development;
    default:
      return development;
  }
}

export default config;

export const configModule = ConfigModule.forRoot({
  load: [config],
})
