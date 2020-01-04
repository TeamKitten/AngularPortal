export class JwtPayload {
  readonly name: string;
  readonly sub: string;
  readonly iss: string;
  readonly iat: number;
  readonly exp: number;
}
