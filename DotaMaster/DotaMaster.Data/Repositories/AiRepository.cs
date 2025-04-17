using System.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace DotaMaster.Data.Repositories
{
    public class AiRepository
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string _url = "https://openrouter.ai/api/v1/chat/completions";
        private const string _model = "deepseek/deepseek-chat-v3-0324:free";

        public AiRepository(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _apiKey = _configuration["AiApiKey"]
                ?? throw new ArgumentNullException("Ai api key is null!");
        }

        public async Task<string> AskAi(string question)
        {
            var response = await SendRequest(question);
            response.EnsureSuccessStatusCode();
            var jsonResponse = await response.Content.ReadAsStringAsync();
            dynamic responseObj = JsonConvert.DeserializeObject(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse AskAi response");

            return responseObj?.choices?[0]?.message?.content?.ToString()
                ?? throw new ArgumentNullException("AskAi response content is null");
        }

        private async Task<HttpResponseMessage> SendRequest(string question)
        {
            var content = new
            {
                model = _model,
                messages = new[]
                {
                    new
                    {
                        role = "user",
                        content = question
                    }
                },
                provider = new
                {
                    order = new[]
                    {
                        "Chutes",
                    }
                }
            };

            string jsonRequestBody = JsonConvert.SerializeObject(content);
            var httpRequest = new HttpRequestMessage(HttpMethod.Post, _url)
            {
                Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json")
            };
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
            return await _httpClient.SendAsync(httpRequest);
        }
    }
}
