/*
 * @Author: liuxin 
 * @Date: 2018-08-25 22:31:59 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-26 22:45:31
 */

package com.nativeproject;

import android.content.ContentResolver;
import android.database.Cursor;
import android.database.sqlite.SQLiteException;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RnSMSModule extends ReactContextBaseJavaModule {

   final String SMS_URI_ALL = "content://sms/";
   final String SMS_URI_INBOX = "content://sms/inbox";
   final String SMS_URI_SEND = "content://sms/sent";
   final String SMS_URI_DRAFT = "content://sms/draft";

    public RnSMSModule(ReactApplicationContext reactContext) {
      super(reactContext);
    }

    @Override
    public String getName() {
        return "RnSMSModule";
    }

    // @ReactMethod
    // public void hi(String name) {
    //   Log.v("ReactNativeJS", name);
    // }

    @ReactMethod
    public void getSmsInPhone(Promise promise) {


        StringBuilder smsBuilder = new StringBuilder();
        // WritableArray array = Arguments.createArray();
        List<Map<String, String>> array = new ArrayList<Map<String,String>>();
        WritableMap map = Arguments.createMap();
        smsBuilder.append("[");
        try {
            ContentResolver cr = super.getCurrentActivity().getContentResolver();
            String[] projection = new String[]{"_id", "address", "person", "body", "date", "type"};
            Uri uri = Uri.parse(SMS_URI_ALL);
            Cursor cur = cr.query(uri, projection, null, null, "date desc");
            if (cur.moveToFirst()) {
                String name;
                String phoneNumber;
                String smsbody;
                String date;
                String type;

                int nameColumn = cur.getColumnIndex("person");
                int phoneNumberColumn = cur.getColumnIndex("address");
                int smsbodyColumn = cur.getColumnIndex("body");
                int dateColumn = cur.getColumnIndex("date");
                int typeColumn = cur.getColumnIndex("type");

                do {
                    name = cur.getString(nameColumn);
                    phoneNumber = cur.getString(phoneNumberColumn);
                    smsbody = cur.getString(smsbodyColumn);
                    String dest = "";
                    if(smsbody != null) {
                        Pattern p = Pattern.compile("\\s*|\t|\r|\n");
                        Matcher m = p.matcher(smsbody);
                        dest = m.replaceAll("");
                        Pattern dotp = Pattern.compile("\"");
                        Matcher dotM = dotp.matcher(dest);
                        dest = dotM.replaceAll("'");
                    }

                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hhmmss");
                    Date d = new Date(Long.parseLong(cur.getString(dateColumn)));
                    date = dateFormat.format(d);

                    int typeId = cur.getInt(typeColumn);
                    if (typeId == 1) {
                        type = "接收";
                    } else if (typeId == 2) {
                        type = "发送";
                    } else {
                        type = "";
                    }

                    Log.i("smsMap--", dest + "phone:" + phoneNumber);

                    // WritableMap smsMap = Arguments.createMap();
                    Map<String, String> smsMap = new HashMap<String, String>();
                    smsMap.put("name", name);
                    smsMap.put("phoneNumber", phoneNumber);
                    smsMap.put("smsbody", dest);
                    smsMap.put("date", date);
                    smsMap.put("type", type);

                    smsBuilder.append("{");
                    smsBuilder.append("\"name\" : \"" + name + "\",");
                    smsBuilder.append("\"phoneNumber\" : \"" + phoneNumber + "\",");
                    smsBuilder.append("\"smsbody\" : \"" + dest + "\",");
                    smsBuilder.append("\"date\" : \"" + date + "\" ,");
                    smsBuilder.append("\"type\" :\"" + type + "\" ");
                    smsBuilder.append("},");
                    if (smsbody == null) {
                      dest = "";
                    }
                    array.add(smsMap);
                } while (cur.moveToNext());

            } else {
                smsBuilder.append("]");
            }

            smsBuilder.append("]over");
        } catch (SQLiteException ex) {
            Log.e("SQLiteException", ex.getMessage().toString());
        }
        map.putString("sms", smsBuilder.toString());
        // map.putArray("sms", array);
        promise.resolve(map);
    }
}