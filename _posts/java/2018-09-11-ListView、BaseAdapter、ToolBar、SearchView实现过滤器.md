# ListView、BaseAdapter、ToolBar、SearchView实现过滤器

## 1. 设置ToolBar



由于toolbar和actionbar有冲突，所以我们更改主题。

1. styles.xml文件中，修改主题为下面的代码。这样actionbar就没了。

```xml
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        ...
    </style>
</resources>

```

2. 在activity布局文件中添加toolbar

```xml
<android.support.v7.widget.Toolbar
    android:id= "@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:background="@color/colorPrimary">
</android.support.v7.widget.Toolbar>
```

3. 接着，创建toolbar布局。在menu文件夹创建文件toolbar.xml，然后添加SearchView，代码如下:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/item_search"
        android:title="search"
        app:actionViewClass="android.support.v7.widget.SearchView"
        app:showAsAction="always"/>
</menu>
```

4. 在MainActivity中设置

```java
 @Override
    protected void onCreate(Bundle savedInstanceState) {
    	......
        Toolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Title");        // 主标题
        toolbar.inflateMenu(R.menu.toolbar);    //加载toolbar布局文件
        setSupportActionBar(toolbar);        //设置toolbar
        .......
    }
```

## 2. 设置SearchView

1. 在activity中重写以下代码，注意：这里的SearchView是V7的

```java
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.toolbar, menu);    //获取布局菜单到menu
    MenuItem searchItem = menu.findItem(R.id.item_search);         //获得搜索框item
    mSearchView = (SearchView) searchItem.getActionView();         //获得搜索框view
    mSearchView.setOnQueryTextListener(MainActivity.this);         //设置查询监听器
    return super.onCreateOptionsMenu(menu);
}
```

2. 实现SearchView.OnQueryTextListener接口

```java
public class MainActivity extends AppCompatActivity implements SearchView.OnQueryTextListener{
	......
    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }
    @Override
    public boolean onQueryTextChange(String newText) {
        return false;
    }
}
```

## 3. 创建Adapter

创建Adapter类继承自BaseAdapter，并实现Filterable接口

代码如下：

```java
public class Madapter extends BaseAdapter implements Filterable{
    private List<Bean> item;  //保存原始数据
    private List<Bean> item2; //显示过滤后的数据
    MyFilter mFilter ;	
    LayoutInflater layoutInflater;
    Context context;

    public Madapter(Context context, List<Sensor> item) {
        super();
        this.item = item;
        this.item2 = item;
        this.context = context;
        layoutInflater = (LayoutInflater) this.context.
            	etSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }
    @Override
    public int getCount() {return item2.size();}
    
    @Override
    public Object getItem(int position) {return item2.get(position);}
    
    @Override
    public long getItemId(int position) {return position;}

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        convertView = layoutInflater.inflate(R.layout.item,null);
        TextView textView = convertView.findViewById(R.id.list_item);
        textView.setText(item2.get(position).getName());
        return convertView;
    }

    @Override
    public Filter getFilter() {
        if (mFilter ==null){
            mFilter = new MyFilter();
        }
        return mFilter;
    }

    class MyFilter extends Filter{
        //在这里定义过滤规则
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            FilterResults results = new FilterResults();
            List<Bean> list;
            //当过滤的关键字为空的时候，我们则显示所有的数据
            if (TextUtils.isEmpty(constraint)){
                list  = item;
            }else {
                //否则把符合条件的数据对象添加到集合中
                list = new ArrayList<>();   //新建ArrayList用于存放符合过滤条件的项
                for (Bean bean: item){
                    if (Bean.getName().contains(constraint)
                        ||Bean.getName().contains(constraint)){
                        list.add(bean);
                    }
                }
            }
            results.values = list; //将得到的集合保存到FilterResults的value变量中
            results.count = list.size();//将集合的大小保存到FilterResults的count变量中

            return results; //返回results，publishResults(CharSequence constraint, FilterResults results)接受此返回值
        }
        //在这里更新显示结果
        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            item2 = (List<Bean>)results.values;   //取出results中存放的集合
            if (results.count > 0){
                notifyDataSetChanged();//通知数据发生了改变
            }else {
                notifyDataSetInvalidated();//通知数据失效
            }
        }
    }
}

```

## 4. 设置ListView

1. 在activity的布局文件中添加如下代码：

```xml
<ListView
        android:id="@+id/id_listview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />
```

2. 在activity中设置ListView

```java
listView = findViewById(R.id.id_listview);
listView.setTextFilterEnabled(true);        //打开过滤功能
madapter = new Madapter(MainActivity.this, list);
listView.setAdapter(madapter);
```



至此，程序终于显示出了Toolbar、SearchView以及ListView，但我们改变SearchView里的内容，ListView并没有被过滤显示。不着急，只需修改 **2. 设置SearchView** 的**2.实现SearchView.OnQueryTextListener接口**实现的方法为：

```java
@Override
public boolean onQueryTextSubmit(String query) {
	return false;
}

@Override
    public boolean onQueryTextChange(String newText) {
    madapter.getFilter().filter(newText);
    return false;
}
```

