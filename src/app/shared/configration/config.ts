import { environment } from '../../../environments/environment';

export class Config {
    public static readonly Auth = `${environment.apiUrl}auth`;
}