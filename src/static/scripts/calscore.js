/**
 * Created by B-04 on 2017/7/10.
 */

/*
 数据模型配置数据：
 benchmark：基准场次
 baseRate：基础加权
 baseScore1：得分基准1
 baseScore2：得分基准2
 baseScore3：得分基准3
 hexagonBaseData: 六边形维度基准值配置
 name：维度名
 level1：维度判定基准1
 level2：维度判定基准2
 level3：维度判定基准3
 */
var dataModel = {
    baseData: {
        benchmark: 100,
        baseRate: 0.5,
        baseScore1: 60,
        baseScore2: 95,
        baseScore3: 100
    },
    hexagonBaseData:{
        '1': {
            name: 'GPM',
            level1: 480,
            level2: 700,
            level3: 1350
        },
        '2': {
            name: 'DPM',
            level1: 3500,
            level2: 8000,
            level3: 12000
        },
        '3': {
            name: 'A',
            level1: 6.31,
            level2: 12.6,
            level3: 18.9
        },
        '4': {
            name: 'D',
            level1: 4.91,
            level2: 2.45,
            level3: 1.2
        },
        '5': {
            name: 'KDA',
            level1: 2.35,
            level2: 4.5,
            level3: 7
        }
    }
};

//核心算法
function calScore(modelState, data, totalMatches) {
    var thisModel = dataModel.hexagonBaseData[modelState];
    if (thisModel) {
        var base1 = dataModel.baseData.baseScore1;
        var base2 = dataModel.baseData.baseScore2;
        var base3 = dataModel.baseData.baseScore3;
        var level1 = thisModel.level1;
        var level2 = thisModel.level2;
        var level3 = thisModel.level3;
        var rData = 0;
        if (thisModel.name == 'D') {
            if (data >= 3 * level1) {
                rData = 0;
            } else if (data > level1 && data < 3 * level1) {
                rData = base1 - base1 * (data - level1) / (2 * level1);
            } else if (data <= level1 && data > level2) {
                rData = base2 - (base2 - base1) * (data - level2) / (level1 - level2);
            } else if (data <= level2 && data > level3) {
                rData = base3 - (base3 - base2) * (data - level3) / (level2 - level3);
            } else if (data <= level3 && data >= 0) {
                rData = 100;
            }
        } else {
            if (data >= 0 && data < level1) {
                rData = base1 * data / level1;
            } else if (data >= level1 && data < level2) {
                rData = base1 + (base2 - base1) * (data - level1) / (level2 - level1);
            } else if (data >= level2 && data < level3) {
                rData = base2 + (base3 - base2) * (data - level2) / (level3 - level2);
            } else if (data >= level3) {
                rData = 100;
            }
        }
        return (rData * calRate(totalMatches)).toFixed(1);
    } else {
        console.log('error data');
    }
}
//场次加权
function calRate(num) {
    var rate = 0;
    var baseRate = dataModel.baseData.baseRate;
    var benchmark = dataModel.baseData.benchmark;
    if (num >= 2 * benchmark) {
        rate = 1;
    } else if (num > 0 && num < 2 * benchmark) {
        rate = baseRate + (1 - baseRate) * num / (2 * benchmark);
    }
    return rate;
}