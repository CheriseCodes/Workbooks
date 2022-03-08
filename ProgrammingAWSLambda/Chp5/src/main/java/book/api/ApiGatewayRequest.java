package book.api;

import java.util.HashMap;
import java.util.Map;

// com.amazon.aws.services.lambda.runtime.events.APIGatewayProxyRequestEvent
public class ApiGatewayRequest {
    public String body;
    public Map<String, String> queryStringParameters = new HashMap<>();
}
