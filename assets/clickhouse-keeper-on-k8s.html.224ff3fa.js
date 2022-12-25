import{_ as a,V as e,W as t,Y as n,Z as l,$ as i,X as c,y as p}from"./framework.7aad78ec.js";const u={},o={href:"https://github.com/Hayaking/clickhouse-keeper-on-k8s/blob/master/clickhouse-cluster/clickhouse-statefulset.yml",target:"_blank",rel:"noopener noreferrer"},r=c(`<h2 id="configmap" tabindex="-1"><a class="header-anchor" href="#configmap" aria-hidden="true">#</a> ConfigMap</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>config
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>test
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">keeper.xml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    &lt;?xml version=&quot;1.0&quot;?&gt;
    &lt;yandex&gt;
        &lt;listen_host&gt;0.0.0.0&lt;/listen_host&gt;
        &lt;logger&gt;
            &lt;level&gt;trace&lt;/level&gt;
            &lt;console&gt;1&lt;/console&gt;
        &lt;/logger&gt;
        &lt;openSSL&gt;
            &lt;server&gt;
                &lt;certificateFile remove=&quot;1&quot;/&gt;
                &lt;privateKeyFile remove=&quot;1&quot;/&gt;
            &lt;/server&gt;
        &lt;/openSSL&gt;
        &lt;keeper_server&gt;
            &lt;tcp_port&gt;2181&lt;/tcp_port&gt;
            &lt;server_id from_env=&quot;CK_INDEX&quot;/&gt;
            &lt;log_storage_path&gt;/var/lib/clickhouse/coordination/log&lt;/log_storage_path&gt;
            &lt;snapshot_storage_path&gt;/var/lib/clickhouse/coordination/snapshots&lt;/snapshot_storage_path&gt;
            
            &lt;coordination_settings&gt;
                &lt;operation_timeout_ms&gt;10000&lt;/operation_timeout_ms&gt;
                &lt;session_timeout_ms&gt;30000&lt;/session_timeout_ms&gt;
                &lt;raft_logs_level&gt;trace&lt;/raft_logs_level&gt;
                &lt;rotate_log_storage_interval&gt;10000&lt;/rotate_log_storage_interval&gt;
            &lt;/coordination_settings&gt;
            
            &lt;raft_configuration&gt;
                &lt;server&gt;
                    &lt;id&gt;0&lt;/id&gt;
                    &lt;hostname&gt;clickhouse-0.clickhouse-service.clickhouse-test&lt;/hostname&gt;
                    &lt;port&gt;9444&lt;/port&gt;
                &lt;/server&gt;
                &lt;server&gt;
                    &lt;id&gt;1&lt;/id&gt;
                    &lt;hostname&gt;clickhouse-1.clickhouse-service.clickhouse-test&lt;/hostname&gt;
                    &lt;port&gt;9444&lt;/port&gt;
                &lt;/server&gt;
                &lt;server&gt;
                    &lt;id&gt;2&lt;/id&gt;
                    &lt;hostname&gt;clickhouse-2.clickhouse-service.clickhouse-test&lt;/hostname&gt;
                    &lt;port&gt;9444&lt;/port&gt;
                &lt;/server&gt;
            &lt;/raft_configuration&gt;
        &lt;/keeper_server&gt;
        
        &lt;zookeeper&gt;
            &lt;node&gt;
                &lt;host&gt;clickhouse-0.clickhouse-service.clickhouse-test&lt;/host&gt;
                &lt;port&gt;2181&lt;/port&gt;
            &lt;/node&gt;
            &lt;node&gt;
                &lt;host&gt;clickhouse-1.clickhouse-service.clickhouse-test&lt;/host&gt;
                &lt;port&gt;2181&lt;/port&gt;
            &lt;/node&gt;
            &lt;node&gt;
                &lt;host&gt;clickhouse-2.clickhouse-service.clickhouse-test&lt;/host&gt;
                &lt;port&gt;2181&lt;/port&gt;
            &lt;/node&gt;
        &lt;/zookeeper&gt;
    &lt;/yandex&gt;</span>

  <span class="token key atrule">cluster.xml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    &lt;?xml version=&quot;1.0&quot;?&gt;
    &lt;yandex&gt;
        &lt;remote_servers&gt;
            &lt;testcluster&gt;
                &lt;shard&gt;
                    &lt;replica&gt;
                        &lt;host&gt;clickhouse-0.clickhouse-service.clickhouse-test&lt;/host&gt;
                        &lt;port&gt;9000&lt;/port&gt;
                    &lt;/replica&gt;
                &lt;/shard&gt;
                &lt;shard&gt;
                    &lt;replica&gt;
                        &lt;host&gt;clickhouse-1.clickhouse-service.clickhouse-test&lt;/host&gt;
                        &lt;port&gt;9000&lt;/port&gt;
                    &lt;/replica&gt;
                &lt;/shard&gt;
            &lt;/testcluster&gt;
        &lt;/remote_servers&gt;
    &lt;/yandex&gt;</span>
  <span class="token key atrule">macros.xml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    &lt;?xml version=&quot;1.0&quot; ?&gt;
    &lt;yandex&gt;
        &lt;macros&gt;
            &lt;cluster&gt;testcluster&lt;/cluster&gt;
            &lt;replica from_env=&quot;HOSTNAME&quot;/&gt;
            &lt;shard&gt;1&lt;/shard&gt;
        &lt;/macros&gt;
    &lt;/yandex&gt;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> clickhouse
  <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>test
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rest
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8123</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> keeper
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">2181</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> replica<span class="token punctuation">-</span>a
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9000</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> replica<span class="token punctuation">-</span>b
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9009</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> raft
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9444</span>

  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> clickhouse

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="statefulset" tabindex="-1"><a class="header-anchor" href="#statefulset" aria-hidden="true">#</a> StatefulSet</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>test
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> clickhouse
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>service
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">podManagementPolicy</span><span class="token punctuation">:</span> <span class="token string">&quot;Parallel&quot;</span>
  <span class="token comment">#  podManagementPolicy: OrderedReady</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> clickhouse
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse
          <span class="token key atrule">image</span><span class="token punctuation">:</span> clickhouse/clickhouse<span class="token punctuation">-</span>server<span class="token punctuation">:</span>22.4.5
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">workingDir</span><span class="token punctuation">:</span> /
          <span class="token key atrule">command</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> /bin/bash
            <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
            <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
              export CK_INDEX=$<span class="token punctuation">{</span>HOSTNAME<span class="token comment">##*-}</span>
              echo CK_INDEX=$<span class="token punctuation">{</span>CK_INDEX<span class="token punctuation">}</span>
              ./entrypoint.sh
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> HOSTNAME
              <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
                <span class="token key atrule">fieldRef</span><span class="token punctuation">:</span>
                  <span class="token key atrule">fieldPath</span><span class="token punctuation">:</span> metadata.name
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rest
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8123</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> keeper
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">2181</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> replica<span class="token punctuation">-</span>a
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">9000</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> replica<span class="token punctuation">-</span>b
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">9009</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> raft
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">9444</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>config
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/clickhouse<span class="token punctuation">-</span>server/config.d/
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>user<span class="token punctuation">-</span>config
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/clickhouse<span class="token punctuation">-</span>server/users.d/

      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>config
          <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>config
            <span class="token key atrule">items</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> keeper.xml
                <span class="token key atrule">path</span><span class="token punctuation">:</span> keeper.xml
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> cluster.xml
                <span class="token key atrule">path</span><span class="token punctuation">:</span> cluster.xml
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> macros.xml
                <span class="token key atrule">path</span><span class="token punctuation">:</span> macros.xml
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>user<span class="token punctuation">-</span>config
          <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>user<span class="token punctuation">-</span>config
            <span class="token key atrule">items</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> user.xml
                <span class="token key atrule">path</span><span class="token punctuation">:</span> user.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="user-configmap" tabindex="-1"><a class="header-anchor" href="#user-configmap" aria-hidden="true">#</a> user ConfigMap</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>user<span class="token punctuation">-</span>config
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> clickhouse<span class="token punctuation">-</span>test
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">user.xml</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    &lt;?xml version=&quot;1.0&quot;?&gt;
    &lt;yandex&gt;
        &lt;profiles&gt;
            &lt;default&gt;
                &lt;max_memory_usage&gt;10000000000&lt;/max_memory_usage&gt;
                &lt;max_distributed_depth&gt;4000&lt;/max_distributed_depth&gt;
                &lt;distributed_connections_pool_size&gt;4096&lt;/distributed_connections_pool_size&gt;
                &lt;max_distributed_connections&gt;4096&lt;/max_distributed_connections&gt;
                &lt;load_balancing&gt;random&lt;/load_balancing&gt;
            &lt;/default&gt;
        &lt;/profiles&gt;
    &lt;/yandex&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function d(v,k){const s=p("ExternalLinkIcon");return e(),t("div",null,[n("p",null,[n("a",o,[l("github"),i(s)])]),r])}const b=a(u,[["render",d],["__file","clickhouse-keeper-on-k8s.html.vue"]]);export{b as default};
