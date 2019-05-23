package com.hozan.hx.rn;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.os.AsyncTask;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.hozan.hx.MainApplication;


import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class CommonModule extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;

    public CommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CommonModule";
    }

    @Override
    public @Nullable
    Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();

        constants.put("userAgent", System.getProperty("http.agent"));
        constants.put("appVersionCode", getVersionCode(getCurrentContext()));
        constants.put("appVersionName", getVersionName(getCurrentContext()));
        return constants;
    }

    //版本名
    public String getVersionName(Context context) {
        return getPackageInfo(context).versionName;
    }

    //版本号
    public int getVersionCode(Context context) {
        return getPackageInfo(context).versionCode;
    }

    private PackageInfo getPackageInfo(Context context) {
        PackageInfo pi = null;

        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);

            return pi;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pi;
    }

    private Context getCurrentContext() {
        if (reactContext !=null && reactContext.getCurrentActivity()!=null && reactContext.getCurrentActivity().getBaseContext()!=null){
            return this.reactContext.getCurrentActivity().getBaseContext();
        }
        return MainApplication.getAppContext();
    }

    //退出应用
    @ReactMethod
    public void exitApp() {
        final Activity currentActivity = this.reactContext.getCurrentActivity();
        if(currentActivity != null) {
            currentActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    currentActivity.finish();
                    System.exit(0);
                }
            });
        }
    }

    @ReactMethod
    public void compressImages(final ReadableArray paths, final int quality, final int maxWidth, final int maxHeight, final Promise promise) {
        AsyncTask<Void, Void, Void> asyncTask = new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                ArrayList<Object> oriPaths = paths.toArrayList();
                WritableArray newPaths = new WritableNativeArray();
                WritableArray writableOriPaths = new WritableNativeArray();

                for (int i = 0; i < oriPaths.size(); i++) {
                    String oriPath = String.valueOf(oriPaths.get(i));
                    String path = compressBitmapWithPath(String.valueOf(oriPaths.get(i)), quality * 100, maxWidth, maxHeight, String.valueOf(oriPath.hashCode()));
                    newPaths.pushString("file://" + path);
                    writableOriPaths.pushString(oriPath);
                }

                WritableMap map = new WritableNativeMap();
                map.putArray("oriPaths", writableOriPaths);
                map.putArray("newPaths", newPaths);
                promise.resolve(map);

                return null;
            }
        };

        asyncTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }
    @ReactMethod
    public String compressBitmapWithPath(String path, int quality, int maxWidth, int maxHeight, String id) {
        //拿到图片以及高宽
        BitmapFactory.Options options = new BitmapFactory.Options();
        String newPath = path.replaceAll("file://", "");
        Bitmap photo = BitmapFactory.decodeFile(newPath, options);
        int initialWidth = options.outWidth;
        int initialHeight = options.outHeight;

        //对图片进行缩放
        BitmapFactory.Options imageOptions = new BitmapFactory.Options();
        imageOptions.inScaled = false;
        imageOptions.inSampleSize = 1;
        if (maxWidth != 0 || maxHeight != 0) {
            while ((maxWidth == 0 || initialWidth > 2 * maxWidth) &&
                    (maxHeight == 0 || initialHeight > 2 * maxHeight)) {
                imageOptions.inSampleSize *= 2;
                initialHeight /= 2;
                initialWidth /= 2;
            }
        }
        photo = BitmapFactory.decodeFile(newPath, imageOptions);
        if (maxWidth == 0 || maxWidth > initialWidth) {
            maxWidth = initialWidth;
        }
        if (maxHeight == 0 || maxHeight > initialHeight) {
            maxHeight = initialHeight;
        }
        double widthRatio = (double) maxWidth / initialWidth;
        double heightRatio = (double) maxHeight / initialHeight;
        double ratio = (widthRatio < heightRatio)
                ? widthRatio
                : heightRatio;
        Matrix matrix = new Matrix();
        matrix.postScale((float) ratio, (float) ratio);
        Bitmap scalePhoto = Bitmap.createBitmap(photo, 0, 0, photo.getWidth(), photo.getHeight(), matrix, true);

        //对图片进行压缩并且保存
        File file = new File(reactContext.getExternalCacheDir(), "photo-" + id + ".jpg");
        try {
            FileOutputStream out = new FileOutputStream(file);
            scalePhoto.compress(Bitmap.CompressFormat.JPEG, quality, out);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file.getAbsolutePath();
    }

}
