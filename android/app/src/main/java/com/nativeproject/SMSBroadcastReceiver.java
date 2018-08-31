/*
 * @Author: liuxin 
 * @Date: 2018-08-26 18:13:08 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-26 23:48:54
 */

package com.nativeproject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;
import android.app.ActivityManager;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.facebook.react.HeadlessJsTaskService;
/**
 * Created by 27c1 on 2016/12/27.
 */

public class SMSBroadcastReceiver extends BroadcastReceiver {
 
    // private static final String TAG = "smsreceiver";
    // private String ss;
    // private static MessageListener mMessageListener;
 
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i("smsreceiver","哈啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊------------------------------------------------------");
        Log.i("smsreceiver", "onReceive: " + "收到短信广播");
 
        Bundle bundle = intent.getExtras();
        SmsMessage msg = null;
        if (null != bundle) {
          Intent recIntent = new Intent(context, RecService.class);
          context.startService(recIntent);
          HeadlessJsTaskService.acquireWakeLockNow(context);
            // Object[] smsObj = (Object[]) bundle.get("pdus");
            // for (Object object : smsObj) {
            //     msg = SmsMessage.createFromPdu((byte[]) object);
            //     Date date = new Date(msg.getTimestampMillis());//时间
            //     SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            //     String receiveTime = format.format(date);
            //     Log.i(TAG, "onReceive:===="+"number:" + msg.getOriginatingAddress()
            //             + "   body:" + msg.getDisplayMessageBody() + "  time:"
            //             + msg.getTimestampMillis());
 
            //     // if (msg.getDisplayMessageBody().substring(0,9).equals("【丁丁旅行】验证码")){
            //     //     ss = msg.getDisplayMessageBody().substring(9, 15);
            //     //     Log.i(TAG, "onReceive: 截取的为==="+ ss);
 
            //     //     if (ss.length()==6){
            //     //         mMessageListener.onReceived(ss);
            //     //         abortBroadcast();
            //     //     }
            //     // }
            //     if (msg.getDisplayMessageBody() != null){
            //       ss = msg.getDisplayMessageBody();
            //       Log.i(TAG, "onReceive body-----"+ ss);
            //       Intent recIntent = new Intent(context, RecService.class);
            //       context.startService(recIntent);
            //       HeadlessJsTaskService.acquireWakeLockNow(context);
            //       mMessageListener.onReceived(ss);
            //       abortBroadcast();
            //     }
            // }
        }
    }

    private boolean isAppOnForeground(Context context) {
      /**
        我们需要先检查应用当前是否在前台运行，否则应用会崩溃。
       http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
      **/
      ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
      List<ActivityManager.RunningAppProcessInfo> appProcesses =
      activityManager.getRunningAppProcesses();
      if (appProcesses == null) {
          return false;
      }
      final String packageName = context.getPackageName();
      for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
          if (appProcess.importance ==
          ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
           appProcess.processName.equals(packageName)) {
              return true;
          }
      }
      return false;
    }
 
    // //回调接口
    // public interface MessageListener {
    //     public void onReceived(String message);
    // }
 
    // public void setOnReceivedMessageListener(MessageListener messageListener) {
    //     this.mMessageListener = messageListener;
    // }
}