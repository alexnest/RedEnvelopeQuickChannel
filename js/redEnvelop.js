new Vue({
    el:"#app",
    data: {
        aPackageList:[],
        bPackageList:[],
        cPackageList:[],
        dPackageList:[],
        aPackageCurrentPageNo:1,
        bPackageCurrentPageNo:1,
        cPackageCurrentPageNo:1,
        dPackageCurrentPageNo:1,
        aPackageCurrentPageList:[],
        bPackageCurrentPageList:[],
        cPackageCurrentPageList:[],
        dPackageCurrentPageList:[],
        aPackageTotalPageCount:0,
        bPackageTotalPageCount:0,
        cPackageTotalPageCount:0,
        dPackageTotalPageCount:0,
        tabFocus : 'A'
    },
    mounted: function () {
        this.$nextTick(function () {
            this.initPage();
        });
    },
    methods: {
        initPage : function(){
            this.$http.get("data/redEnvelope.json").then(response=>{
                var res = response.data;
                if(res && res.status==0){
                    //把服务器返回各个福袋的数据赋值给A,B,C,D四个TAB的总记录
                    this.aPackageList = res.result.aPackageList;
                    this.bPackageList = res.result.bPackageList;
                    this.cPackageList = res.result.cPackageList;
                    this.dPackageList = res.result.dPackageList;

                    //初始化A福袋TAB的显示记录
                    if(this.aPackageList.length > 0){
                        //获取A福袋随机当前页码
                        this.aPackageTotalPageCount = Math.ceil(this.aPackageList.length/10);
                        this.aPackageCurrentPageNo = this.getRandomCurrentPageNo(this.aPackageTotalPageCount);
                        //获取A福袋随机当前页结果
                        this.aPackageCurrentPageList = this.getPageDisplay(this.aPackageCurrentPageNo,this.aPackageTotalPageCount,this.aPackageList);
                    }

                    //初始化B福袋TAB的显示记录
                    if(this.bPackageList.length > 0){
                        //获取B福袋随机当前页码
                        this.bPackageTotalPageCount = Math.ceil(this.bPackageList.length/10);
                        this.bPackageCurrentPageNo = this.getRandomCurrentPageNo(this.bPackageTotalPageCount);
                        //获取B福袋随机当前页结果
                        this.bPackageCurrentPageList = this.getPageDisplay(this.bPackageCurrentPageNo,this.bPackageTotalPageCount,this.bPackageList);
                    }

                    //初始化C福袋TAB的显示记录
                    if(this.cPackageList.length > 0){
                        //获取C福袋随机当前页码
                        this.cPackageTotalPageCount = Math.ceil(this.cPackageList.length/10);
                        this.cPackageCurrentPageNo = this.getRandomCurrentPageNo(this.cPackageTotalPageCount);
                        //获取C福袋随机当前页结果
                        this.cPackageCurrentPageList = this.getPageDisplay(this.cPackageCurrentPageNo,this.cPackageTotalPageCount,this.cPackageList);
                    }

                    //初始化D福袋TAB的显示记录
                    if(this.dPackageList.length > 0){
                        //获取D福袋随机当前页码
                        this.dPackageTotalPageCount = Math.ceil(this.dPackageList.length/10);
                        this.dPackageCurrentPageNo = this.getRandomCurrentPageNo(this.dPackageTotalPageCount);
                        //获取D福袋随机当前页结果
                        this.dPackageCurrentPageList = this.getPageDisplay(this.dPackageCurrentPageNo,this.dPackageTotalPageCount,this.dPackageList);
                    }
                }
            });
        },
        getRandomCurrentPageNo : function(totalPageCount){//获取福袋随机当前页码
            var randomPageNo = Math.random()*totalPageCount;
            var currentPageIndex = parseInt(randomPageNo,10);
            var currentPageNo = currentPageIndex + 1;
            return currentPageNo;
        },
        getPageDisplay : function(currentPageNo,totalPageCount,packageList){//获取福袋随机当前页结果
            var startIndex = 10 * (currentPageNo - 1);
            var endIndex = 10 * currentPageNo;
            if(currentPageNo  == totalPageCount){
                endIndex = packageList.length;
            }
            //console.log('starIndex:' + startIndex + ';endIndex:' + endIndex);
            return packageList.slice(startIndex,endIndex);
        },
        getPreviousPageDisplay : function(){//获取福袋随机当前页上一页结果
            var tabFocus = this.tabFocus;
            var currentPageNo = this.aPackageCurrentPageNo;
            var totalPageCount = this.aPackageTotalPageCount;
            var packageList = this.aPackageList;

            if(tabFocus == 'A'){
                currentPageNo = this.aPackageCurrentPageNo;
                //console.log('currentPageNo:' + currentPageNo);
                if(currentPageNo != 1){
                    currentPageNo = currentPageNo - 1;
                    //console.log('previousPageNo:' + currentPageNo);
                    this.aPackageCurrentPageNo = currentPageNo;
                }
                totalPageCount = this.aPackageTotalPageCount;
                packageList = this.aPackageList;
                this.aPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            }else if(tabFocus == 'B'){
                currentPageNo = this.bPackageCurrentPageNo;
                if(currentPageNo != 1){
                    currentPageNo = currentPageNo - 1;
                    this.bPackageCurrentPageNo = currentPageNo;
                }
                totalPageCount = this.bPackageTotalPageCount;
                packageList = this.bPackageList;
                this.bPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            } else if(tabFocus == 'C'){
                currentPageNo = this.cPackageCurrentPageNo;
                if(currentPageNo != 1){
                    currentPageNo = currentPageNo - 1;
                    this.cPackageCurrentPageNo = currentPageNo;
                }
                totalPageCount = this.cPackageTotalPageCount;
                packageList = this.cPackageList;
                this.cPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            } else if(tabFocus == 'D'){
                currentPageNo = this.dPackageCurrentPageNo;
                if(currentPageNo != 1){
                    currentPageNo = currentPageNo - 1;
                    this.dPackageCurrentPageNo = currentPageNo;
                }
                totalPageCount = this.dPackageTotalPageCount;
                packageList = this.dPackageList;
                this.dPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            }
        },
        getNextPageDisplay : function(){//获取福袋随机当前页上一页结果
            var tabFocus = this.tabFocus;
            var currentPageNo = this.aPackageCurrentPageNo;
            var totalPageCount = this.aPackageTotalPageCount;
            var packageList = this.aPackageList;

            if(tabFocus == 'A'){
                currentPageNo = this.aPackageCurrentPageNo;
                //console.log('currentPageNo:' + currentPageNo);
                if(currentPageNo != totalPageCount){
                    currentPageNo = currentPageNo + 1;
                    //console.log('previousPageNo:' + currentPageNo);
                    this.aPackageCurrentPageNo = currentPageNo;
                }
                totalPageCount = this.aPackageTotalPageCount;
                packageList = this.aPackageList;
                this.aPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            }else if(tabFocus == 'B'){
                currentPageNo = this.bPackageCurrentPageNo;
                totalPageCount = this.bPackageTotalPageCount;
                if(currentPageNo != totalPageCount){
                    currentPageNo = currentPageNo + 1;
                    this.bPackageCurrentPageNo = currentPageNo;
                }
                packageList = this.bPackageList;
                this.bPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            } else if(tabFocus == 'C'){
                currentPageNo = this.cPackageCurrentPageNo;
                totalPageCount = this.cPackageTotalPageCount;
                //console.log('currentPageNo:' + currentPageNo + ':totalPageCount:' + totalPageCount);
                if(currentPageNo != totalPageCount){
                    currentPageNo = currentPageNo + 1;
                    this.cPackageCurrentPageNo = currentPageNo;
                }
                packageList = this.cPackageList;
                this.cPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            } else if(tabFocus == 'D'){
                currentPageNo = this.dPackageCurrentPageNo;
                totalPageCount = this.dPackageTotalPageCount;
                if(currentPageNo != totalPageCount){
                    currentPageNo = currentPageNo + 1;
                    this.dPackageCurrentPageNo = currentPageNo;
                }
                packageList = this.dPackageList;
                this.dPackageCurrentPageList = this.getPageDisplay(currentPageNo,totalPageCount,packageList);
            }
        },
        changeTabFocus : function(packageType){
            if(packageType == 'A'){
                this.tabFocus = 'A';
            } else if(packageType == 'B'){
                this.tabFocus = 'B';
            } else if(packageType == 'C'){
                this.tabFocus = 'C';
            } else if(packageType == 'D'){
                this.tabFocus = 'D';
            }
        }
    }
})