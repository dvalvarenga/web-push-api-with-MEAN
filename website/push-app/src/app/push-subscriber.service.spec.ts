import { TestBed, inject } from '@angular/core/testing';

import { PushSubscriberService } from './push-subscriber.service';

describe('PushSubscriberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushSubscriberService]
    });
  });

  it('should be created', inject([PushSubscriberService], (service: PushSubscriberService) => {
    expect(service).toBeTruthy();
  }));
});
