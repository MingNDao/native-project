package com.nativeproject;

import com.facebook.react.ReactActivity;
// import android.net.Uri;
// import android.os.Handler;
// import android.os.Bundle;
// import com.nativeproject.SMSObserver

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "nativeProject";
    }

    // private SmsObserver smsObserver;  //监控数据库变化
    // private Handler smsHandler = new Handler() {};

    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     super.onCreate(savedInstanceState);
    //     smsObserver = new SmsObserver(this, smsHandler);  //实例化内容观察者的子类
    //     getContentResolver().registerContentObserver(Uri.parse("content://sms/"), true, smsObserver);  //注册内容观察者

    // }

}
