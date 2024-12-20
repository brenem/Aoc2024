import { Service } from "typedi";

@Service()
export class Logger {
    error(message?: any, ...optionalParams: any[]) {
        console.error(message, ...optionalParams);
    }

    log(message?: any, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }

    warn(message?: any, ...optionalParams: any[]) {
        console.warn(message, ...optionalParams);
    }
    
    debug(message?: any, ...optionalParams: any[]) {
        console.debug(message, ...optionalParams);
    }
}