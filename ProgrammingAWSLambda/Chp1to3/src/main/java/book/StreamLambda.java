package book;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class StreamLambda {
    public void handlerStream(InputStream inputStream, OutputStream outputStream) throws IOException {
        int letter;
        System.err.println("BEGIN writing to output stream...");
        while((letter = inputStream.read()) != -1) {
            outputStream.write(Character.toUpperCase(letter));
        }
        System.err.println("END writing to output stream...");
    }
}
