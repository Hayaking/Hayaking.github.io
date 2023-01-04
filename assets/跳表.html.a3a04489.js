import{_ as a,V as e,W as t,a0 as r}from"./framework.1bd1ad73.js";const s="/assets/algo/data-structure/跳表/1.png",c={},n=r('<h2 id="一、链表的缺点" tabindex="-1"><a class="header-anchor" href="#一、链表的缺点" aria-hidden="true">#</a> 一、链表的缺点</h2><p>链表在查找元素的时候，因为需要逐一查找，所以查询效率非常低，时间复杂度是O(N)</p><h2 id="二、跳表的优势" tabindex="-1"><a class="header-anchor" href="#二、跳表的优势" aria-hidden="true">#</a> 二、跳表的优势</h2><p>跳表是在链表基础上改进过来的，实现了一种「多层」的有序链表。本质就是抽取链表中部分节点充当索引，加快查询。</p><p><img src="'+s+'" alt="" loading="lazy"></p><p>图中头节点有 L0~L2 三个头指针，分别指向了不同层级的节点，然后每个层级的节点都通过指针连接起来：</p><p>L0 层级共有 5 个节点，分别是节点1、2、3、4、5； L1 层级共有 3 个节点，分别是节点 2、3、5； L2 层级只有 1 个节点，也就是节点 3 。 如果我们要在链表中查找节点 4 这个元素，只能从头开始遍历链表，需要查找 4 次，而使用了跳表后，只需要查找 2 次就能定位到节点 4，因为可以在头节点直接从 L2 层级跳到节点 3，然后再往前遍历找到节点 4。</p><p>可以看到，这个查找过程就是在多个层级上跳来跳去，最后定位到元素。当数据量很大时，跳表的查找复杂度就是 O(logN)。</p>',8),o=[n];function _(d,i){return e(),t("div",null,o)}const h=a(c,[["render",_],["__file","跳表.html.vue"]]);export{h as default};
