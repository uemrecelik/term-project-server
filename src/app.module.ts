import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorModule } from './sensor/sensor.module';
import { Sensor } from './sensor/sensor.entity';
import { herokuConfig } from './heroku-config';
import { UserModule } from './user/user.module';
import { PlantsController } from './plants/plants.controller';
import { PlantsService } from './plants/plants.service';
import { User } from './user/user.entity';
import { Plants } from './plants/plants.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: herokuConfig.host,
      port: 3306,
      username: herokuConfig.username,
      password: herokuConfig.password,
      database: herokuConfig.database,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Sensor, User, Plants]),
    SensorModule,
    UserModule,
    SensorModule,
  ],
  controllers: [AppController, PlantsController],
  providers: [AppService, PlantsService],
})
export class AppModule {}
