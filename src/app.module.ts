import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorModule } from './sensor/sensor.module';
import { Sensor } from './sensor/sensor.entity';
import { herokuConfig } from './heroku-config';
import { SensorService } from './sensor/sensor.service';

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
    TypeOrmModule.forFeature([Sensor]),
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService, SensorService],
})
export class AppModule {}
