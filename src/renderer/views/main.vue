<template>
    <div class="main-box">
        <div class="header">
            <div class="header-left">
                <div class="header-icon">
                    <i class="iconfont icon-relation"></i>
                </div>
                <div class="header-title"></div>
            </div>
            <div class="header-right">
                <div
                    :class="['icon-box', icon.iconBoxClass]"
                    v-for="(icon, index) in icons"
                    :key="index"
                    @click="icon.func"
                >
                    <i :class="icon.className"></i>
                </div>
            </div>
        </div>
        <main class="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    name: '',
    components: {
        
    },
    data() {
        return {
            icons: [
                {
                    className: 'el-icon-minus',
                    func: () => this.onClickMinBtn()
                },
                {
                    className: 'iconfont icon-max',
                    func: () => this.onClickMinBtn()
                },
                {
                    iconBoxClass: 'icon-danger',
                    className: 'el-icon-close',
                    func: () => this.onClickMinBtn()
                }
            ]
        };
    },
    computed: {
        
    },
    watch: {
       
    },
    methods: {
        onClickMinBtn() {
            console.log(123);
        }
    }
};
</script>

<style lang='scss' scoped>
.main-box {
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: #c1cbd7;
    background-color: #21252b;
    .header {
        width: 100%;
        height: 30px;
        .header-left,
        .header-right {
            height: 30px;
        }
        .header-left {
            display: flex;
            line-height: 30px;
            margin-right: 135px;
            .header-icon {
                width: 40px;
                color: #90a4ae;
                text-align: center;
            }
            .header-title {
                flex: 1;
                -webkit-app-region: drag;
            }
        }
        .header-right {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            width: 135px;
            .icon-box {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 45px;
                height: 30px;
            }
            .icon-box:hover {
                background-color: #383b41;
            }
            .icon-danger:hover {
                color: #fff;
                background-color: #d41324;
            }
        }
    }
    .main {
        height: calc(100% - 30px);
        background-color: #282c34;
    }
}
</style>
