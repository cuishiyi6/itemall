import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../../entity/Result";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
  catch(exception: unknown, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    const response = ctx.getResponse()

    const  status =
      exception instanceof HttpException
    ?exception.getStatus():HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.toString()
    message = message.replace('Error: ','')
    response.status(status).json(Result.fail(status,message));
  }

}