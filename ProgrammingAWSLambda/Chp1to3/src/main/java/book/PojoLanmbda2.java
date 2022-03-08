package book;

public class PojoLanmbda2 {
    public PojoResponse handler(PojoInput input) {
        return new PojoResponse("Input was "+input.c);
    }
    public static class PojoInput {
        public String c;
    }
    public static class PojoResponse {
        public final String d;
        PojoResponse(String d) {
            this.d = d;
        }
    }
}
