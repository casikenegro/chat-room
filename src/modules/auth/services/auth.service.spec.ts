import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { DatabaseModule } from '../../../database/database.module';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should schedule an unconfirmed appointment for a user on success', () => {
  //   const startTime = new Date('2022-01-01T14:00:00Z');
  //   const endTime = new Date('2022-01-01T15:00:00Z');

  //   const newAppointment = service.scheduleAppointment({
  //     patientId: 1,
  //     startTime,
  //     endTime,
  //   });

  //   expect(newAppointment).toEqual({
  //     patientId: 1,
  //     startTime,
  //     endTime,
  //     confirmed: false,
  //   });
  // });
});
