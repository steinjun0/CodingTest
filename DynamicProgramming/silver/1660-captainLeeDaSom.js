let N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()

const cannons = [1,4,10,20,35,56,84,120,165,220,286,364,455,560,680,816,969,1140,1330,1540,1771,2024,2300,2600,2925,3276,3654,4060,4495,4960,5456,5984,6545,7140,7770,8436,9139,9880,10660,11480,12341,13244,14190,15180,16215,17296,18424,19600,20825,22100,23426,24804,26235,27720,29260,30856,32509,34220,35990,37820,39711,41664,43680,45760,47905,50116,52394,54740,57155,59640,62196,64824,67525,70300,73150,76076,79079,82160,85320,88560,91881,95284,98770,102340,105995,109736,113564,117480,121485,125580,129766,134044,138415,142880,147440,152096,156849,161700,166650,171700,176851,182104,187460,192920,198485,204156,209934,215820,221815,227920,234136,240464,246905,253460,260130,266916,273819,280840,287980,295240,302621]
// const planes = [1,3,6,10,15,21,28,36,45,55,66,78,91,105,120,136,153,171,190,210,231,253,276,300,325,351,378,406,435,465,496,528,561,595,630,666,703,741,780,820,861,903,946,990,1035,1081,1128,1176,1225,1275,1326,1378,1431,1485,1540,1596,1653,1711,1770,1830,1891,1953,2016,2080,2145,2211,2278,2346,2415,2485,2556,2628,2701,2775,2850,2926,3003,3081,3160,3240,3321,3403,3486,3570,3655,3741,3828,3916,4005,4095,4186,4278,4371,4465,4560,4656,4753,4851,4950,5050,5151,5253,5356,5460,5565,5671,5778,5886,5995,6105,6216,6328,6441,6555,6670,6786,6903,7021,7140,7260,7381,7503,7626,7750,7875,8001,8128,8256,8385,8515,8646,8778,8911,9045,9180,9316,9453,9591,9730,9870,10011,10153,10296,10440,10585,10731,10878,11026,11175,11325,11476,11628,11781,11935,12090,12246,12403,12561,12720,12880,13041,13203,13366,13530,13695,13861,14028,14196,14365,14535,14706,14878,15051,15225,15400,15576,15753,15931,16110,16290,16471,16653,16836,17020,17205,17391,17578,17766,17955,18145,18336,18528,18721,18915,19110,19306,19503,19701,19900,20100,20301,20503,20706,20910,21115,21321,21528,21736,21945,22155,22366,22578,22791,23005,23220,23436,23653,23871,24090,24310,24531,24753,24976,25200,25425,25651,25878,26106,26335,26565,26796,27028,27261,27495,27730,27966,28203,28441,28680,28920,29161,29403,29646,29890,30135,30381,30628,30876,31125,31375,31626,31878,32131,32385,32640,32896,33153,33411,33670,33930,34191,34453,34716,34980,35245,35511,35778,36046,36315,36585,36856,37128,37401,37675,37950,38226,38503,38781,39060,39340,39621,39903,40186,40470,40755,41041,41328,41616,41905,42195,42486,42778,43071,43365,43660,43956,44253,44551,44850,45150,45451,45753,46056,46360,46665,46971,47278,47586,47895,48205,48516,48828,49141,49455,49770,50086,50403,50721,51040,51360,51681,52003,52326,52650,52975,53301,53628,53956,54285,54615,54946,55278,55611,55945,56280,56616,56953,57291,57630,57970,58311,58653,58996,59340,59685,60031,60378,60726,61075,61425,61776,62128,62481,62835,63190,63546,63903,64261,64620,64980,65341,65703,66066,66430,66795,67161,67528,67896,68265,68635,69006,69378,69751,70125,70500,70876,71253,71631,72010,72390,72771,73153,73536,73920,74305,74691,75078,75466,75855,76245,76636,77028,77421,77815,78210,78606,79003,79401,79800,80200,80601,81003,81406,81810,82215,82621,83028,83436,83845,84255,84666,85078,85491,85905,86320,86736,87153,87571,87990,88410,88831,89253,89676,90100,90525,90951,91378,91806,92235,92665,93096,93528,93961,94395,94830,95266,95703,96141,96580,97020,97461,97903,98346,98790,99235,99681,100128,100576,101025,101475,101926,102378,102831,103285,103740,104196,104653,105111,105570,106030,106491,106953,107416,107880,108345,108811,109278,109746,110215,110685,111156,111628,112101,112575,113050,113526,114003,114481,114960,115440,115921,116403,116886,117370,117855,118341,118828,119316,119805,120295,120786,121278,121771,122265,122760,123256,123753,124251,124750,125250,125751,126253,126756,127260,127765,128271,128778,129286,129795,130305,130816,131328,131841,132355,132870,133386,133903,134421,134940,135460,135981,136503,137026,137550,138075,138601,139128,139656,140185,140715,141246,141778,142311,142845,143380,143916,144453,144991,145530,146070,146611,147153,147696,148240,148785,149331,149878,150426,150975,151525,152076,152628,153181,153735,154290,154846,155403,155961,156520,157080,157641,158203,158766,159330,159895,160461,161028,161596,162165,162735,163306,163878,164451,165025,165600,166176,166753,167331,167910,168490,169071,169653,170236,170820,171405,171991,172578,173166,173755,174345,174936,175528,176121,176715,177310,177906,178503,179101,179700,180300,180901,181503,182106,182710,183315,183921,184528,185136,185745,186355,186966,187578,188191,188805,189420,190036,190653,191271,191890,192510,193131,193753,194376,195000,195625,196251,196878,197506,198135,198765,199396,200028,200661,201295,201930,202566,203203,203841,204480,205120,205761,206403,207046,207690,208335,208981,209628,210276,210925,211575,212226,212878,213531,214185,214840,215496,216153,216811,217470,218130,218791,219453,220116,220780,221445,222111,222778,223446,224115,224785,225456,226128,226801,227475,228150,228826,229503,230181,230860,231540,232221,232903,233586,234270,234955,235641,236328,237016,237705,238395,239086,239778,240471,241165,241860,242556,243253,243951,244650,245350,246051,246753,247456,248160,248865,249571,250278,250986,251695,252405,253116,253828,254541,255255,255970,256686,257403,258121,258840,259560,260281,261003,261726,262450,263175,263901,264628,265356,266085,266815,267546,268278,269011,269745,270480,271216,271953,272691,273430,274170,274911,275653,276396,277140,277885,278631,279378,280126,280875,281625,282376,283128,283881,284635,285390,286146,286903,287661,288420,289180,289941,290703,291466,292230,292995,293761,294528,295296,296065,296835,297606,298378,299151,299925,300700]
// for(let i=1;i<1000;i++){
//     const cannon = cannons[i-1]+planes[i]
//     cannons.push(cannon)
//     if(cannon > 300000) break
// }
// console.table(cannons)
// console.log(cannons.join(','))

const dp = [-1,]
for(let i = 1;i<=N;i++){
    for(let j=0;j<cannons.length;j++){
        if(cannons[j] === i){
            dp[i] = 1
        }
        else if(cannons[j] < i){
            dp[i] = Math.min(dp[i]??Infinity,dp[i-cannons[j]]+1)
        }else if(cannons[j] > i){
            break
        }
    }
}
console.log(dp[N])


// 01:01:05 맞았습니다!
// 배열의 미리 만들어진 값에 재할당 하는 것이, 새롭게 index를 추가하는 것 보다 빠르다.