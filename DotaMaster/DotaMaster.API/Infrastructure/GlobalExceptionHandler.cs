using DotaMaster.Domain.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Infrastructure
{
    internal sealed class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(
                exception, "Exception occurred: {Message}", exception.Message);

            var problemDetails = new ProblemDetails();

            if (exception is PrivateProfileException privateProfileException)
            {
                // Обработка BadRequestException
                problemDetails = new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Bad Request",
                    Detail = privateProfileException.Message
                };
                httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else
            {
                // Обработка всех других исключений
                problemDetails = new ProblemDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Title = "Server error",
                    Detail = "An unexpected error occurred. Please try again later."
                };
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            }

            await httpContext.Response
                .WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}
