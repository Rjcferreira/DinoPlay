package io.github.rjcferreira.dinoplay;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

import java.util.Locale;

public class MainActivity extends BridgeActivity {
    private TextToSpeech textToSpeech;
    private volatile boolean speechReady = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        WebView webView = getBridge().getWebView();
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.addJavascriptInterface(new NativeSpeechBridge(), "DinoPlayNative");

        textToSpeech = new TextToSpeech(getApplicationContext(), status -> {
            speechReady = status == TextToSpeech.SUCCESS;
            if (speechReady) textToSpeech.setLanguage(Locale.getDefault());
        });
    }

    private final class NativeSpeechBridge {
        @JavascriptInterface
        public boolean isReady() {
            return speechReady;
        }

        @JavascriptInterface
        public void speak(String text, String language, float rate, float pitch) {
            if (text == null || text.trim().isEmpty()) return;
            runOnUiThread(() -> {
                if (!speechReady || textToSpeech == null) return;
                Locale locale = language == null || language.isEmpty()
                    ? Locale.getDefault()
                    : Locale.forLanguageTag(language.replace('_', '-'));
                textToSpeech.setLanguage(locale);
                textToSpeech.setSpeechRate(Math.max(0.5f, Math.min(rate, 1.5f)));
                textToSpeech.setPitch(Math.max(0.5f, Math.min(pitch, 1.5f)));
                textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "dinoplay-speech");
            });
        }

        @JavascriptInterface
        public void stop() {
            runOnUiThread(() -> {
                if (textToSpeech != null) textToSpeech.stop();
            });
        }
    }

    @Override
    public void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        super.onDestroy();
    }
}
