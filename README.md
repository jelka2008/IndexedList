# **Indexed List**

The IndexedList is object like Map object which holds key-value pairs and remembers the original insertion order of the keys.

We added to it:
- the ability to fill the IndexedList both from the beginning and from the end (configured once at initialization)
  
- method shallow copy - return only new link for instans, but not make new instans - allow you to use  IndexedList in Redux
  
- array's method slice - allow you to easily extract a part of IndexedList by indeces (e.g. for pagination)
  
- a series of array methods which call the passed function for each element (e.g. `forEach()`, `map()`, `filter()`, `some()`). We saved their interfaces like in array, but under the hood - more productive on large amounts of data - `for of`.




<!-- And due to
Data elements in this structure have indeces like primary keys in data base. And the indeces allow you to perform almost all operations on elemgetting ents in O(1) and delete n elements for O(n) -->

 **Usage**
=

**Constructor**
---

**`UniqIndexedList(inputList, idsKey, [isReversed])`**


`inputList` - array of items anything types (including functions, objects, or any primitive). 


`idsKey` - principle of generating keys for items.
- **name atribut** from inputList's items which has unique value
- **or function** what call for each inputList's items and must return unique value.

>**Key types** - can be any value (including functions, objects, or any primitive). 

`isReversed` - is `false` by default and new elements are added at the end

```
const testArray = [
  { key: "q", value: 1 },
  { key: "w", value: 2 },
  { key: "e", value: 3 },
];

const idsKey = "key"
// which is equivalent to
// const idsKey = (item) => item["key"]

const indexedList = new UniqIndexedList(testArray,idsKey)

const indexedListR = new UniqIndexedList(testArray,idsKey , true)
```
**Instance properties**
---
**`length`** - returns the number of key/value pairs (indexedList's items)
```
console.log(indexedList.length) // 3
```

**Instance methods**
---

**`at(`**_`id`_**`)`** - returns the indexedList's items by index (number of position) 

**`getByKey(`**_`key`_**`)`** - returns the indexedList's items by given key
```
console.log(indexedList_1.getByKey("w")) // { key: "w", value: 2 }
```

**`getByKeyA(`**_`key`_**`)`** - returns array with the indexedList's items by given key

**`hasKey(`**_`key`_**`)`** - returns `true` or `false` according to checking if given key exists in the indexedList

**`deleteByKey(`**_`key`_**`)`** - returns index of removed the indexedList's items by given key

**`addOrUpdate(`**_`newItem`_**`)`** - gets the key by applying `idsKey` to `newItem` and checks if the indexedList already has such the key.

If so than the `newItem` will update the old indexedList's item.

Else, the `newItem` will be added to the indexedList

>The addition will be at the beginning or at the end, depending on the `isReversed` parameter set during initialization.

--

**`filter(`**_`callback`_**`)`** - return array of the indexedList's item satisfying the `callback` function.  It has version which return iterable result (`filterIter`)

**`forEach(`**_`callback`_**`)`** - returns array of results of calls `callback` for every indexedList's items 

**`map(`**_`callback`_**`)`** - returns array of results of calls `callback` for every indexedList's items. It has version which return iterable result (`mapIter`)

**`some(`**_`callback`_**`)`** -  checks if at least one element in the array passes the test implemented by the provided `callback` function. 

<!-- Syntax -->

```
const verificationCallback = (el: any) => el.value > 2;
indexedList_1.filter(callback);

const input = indexedList_1.filter(verificationCallback);
const input = indexedList_1.filter(verificationCallback);

```



