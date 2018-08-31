import android.content.ContentResolver;
import android.content.Context;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
 
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
/**
 * Created by 27c1 on 2016/12/29.
 */
 
public class SMSObserver extends ContentObserver {
 
    private static final String TAG = "smsobserver";
    private Context context;
    public static Uri SMS_INBOX = Uri.parse("content://sms/");
    private Handler handler = new Handler();
 
    /**
     * Creates a content observer.
     *
     * @param handler The handler to run {@link #onChange} on, or null if none.
     */
    public SMSObserver(Context context, Handler handler) {
        super(handler);
        this.context = context;
        this.handler = handler;
    }
 
    @Override
    public void onChange(boolean selfChange) {
        Log.i(TAG, "onChange===");
        super.onChange(selfChange);
        //每当有新短信到来时，使用我们获取短消息的方法
        getSmsFromPhone();
    }
 
    private void getSmsFromPhone() {
      ContentResolver cr = context.getContentResolver();
        String[] projection = new String[]{"_id", "address", "person", "body", "date", "type"};
        Cursor cursor = cr.query(SMS_INBOX, projection, null, null, "date desc");

        Log.i(TAG, "-----------------------getSmsFromPhone=============");
        // ContentResolver cr = context.getContentResolver();
        // String[] projection = new String[]{"body"};//"_id", "address", "person",, "date", "type
        // String where = "  date >  " + getCodeTime;
        // Cursor cursor = cr.query(SMS_INBOX, projection, where, null, "date desc");
        if (cursor != null) {
            if (cursor.moveToNext()) {
                String body = cursor.getString(cursor.getColumnIndex("body"));
                Log.i(TAG, "getSmsFromPhone:短信内容===" + body);
                // if (body.contains("XXX验证码")) {
                //     //这里我是要获取自己短信服务号码中的验证码~~
                //     String regEx = "[^0-9]";
                //     Pattern p = Pattern.compile(regEx);
                //     Matcher m = p.matcher(body);
                //     String num = m.replaceAll("").trim().toString();
                //     Log.i(TAG, "getSmsFromPhone: num===" + num);
                //     if (num != null) {
                //         Message message = new Message();
                //         message.obj = num;
                //         handler.sendMessage(message);
                //     }
                // } else {
                //     Log.i(TAG, "getSmsFromPhone: " + "没有收到XXX的短信");
                // }
            }
        } else {
            return;
        }
    }
}