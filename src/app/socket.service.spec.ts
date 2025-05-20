import { SocketService } from './socket.service';

describe('SocketService.generateHex', () => {
  it('should return a hex color string', () => {
    const hex = SocketService.generateHex();
    expect(hex).toMatch(/^#[0-9A-F]{6}$/);
  });
});
