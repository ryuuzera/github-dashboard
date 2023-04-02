import CookiesManager from '../cookies.service';
import NookiesService from './cookies.service';

export default new CookiesManager(new NookiesService());
