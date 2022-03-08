package book;

import java.io.InputStream;
import java.io.OutputStream;

// TODO: How do I run this to display the correct output?
public class WhatIsMyLambdaEvent {
    public void handler(InputStream is, OutputStream os) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        System.out.println(s.hasNext() ? s.next() : "No input detected");
    }
}
