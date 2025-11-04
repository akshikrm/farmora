import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/packages/listPackages.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/localStorage.dart';
import 'package:farmora/utils/navigationUtils.dart';
// import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget {
  const Dashboard({super.key});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      drawer: Drawer(
    
         child: ListView(
          padding: EdgeInsets.zero,
          children: [
            SizedBox(height: 30,),
           AppIcon(),
             SizedBox(height: 10,),
           Divider(
            color: ColorUtils().primaryColor.withOpacity(.5),
           ),
             SizedBox(height: 10,),
            ListTile(
              leading: Icon(Icons.home),
              title: Text("Home"),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text("Packages"),
              onTap: () {
                NavigationUtils.navigateTo(context, ListPackages());
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text("Settings"),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text("Logout"),
              onTap: () async{
                showLoading();
                await SharedPreferenceHelper.clearData();
                hideLoading();
               NavigationUtils.navigateAndRemoveUntil(context, Loginpage());
              },
            ),
          ],
        ),
      ),
      appBar: AppBar(
          actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Icon(Icons.notifications_none),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Icon(Icons.settings),
          )
        ],
      ),
      // appBar: AppBar(
      //   title: Column(
      //     crossAxisAlignment: CrossAxisAlignment.start,
      //     children: [
      //       Text(
      //         "Hello👋😊",
      //         style: TextStyle(fontSize: 14),
      //       ),
      //       Text(
      //         "Shijin M Simon",
      //         style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
      //       )
      //     ],
      //   ),
      //   automaticallyImplyLeading: false,
      //   actions: [
      //     Padding(
      //       padding: const EdgeInsets.all(8.0),
      //       child: Icon(Icons.notifications_none),
      //     ),
      //     Padding(
      //       padding: const EdgeInsets.all(8.0),
      //       child: Icon(Icons.settings),
      //     )
      //   ],
      // ),
     
     
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Overview",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              SizedBox(
                height: 15,
              ),
              Row(
                children: [
                  Expanded(
                    child: Container(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Balance Sheet "),
                            SizedBox(
                              height: 5,
                            ),
                            Text(
                              "\$1,57,876",
                              style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                  color: Colors.white),
                            ),
                            SizedBox(
                              height: 5,
                            ),
                          ],
                        ),
                      ),
                      decoration: BoxDecoration(
                          color: ColorUtils().primaryColor,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade200)),
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: Container(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Purchase Balance "),
                            SizedBox(
                              height: 5,
                            ),
                            Text(
                              "\$15,57,876",
                              style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                  color: Colors.white),
                            ),
                            SizedBox(
                              height: 5,
                            ),
                          ],
                        ),
                      ),
                      decoration: BoxDecoration(
                          color: Colors.lightBlueAccent,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade200)),
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 15,
              ),
              Row(
                children: [
                  Expanded(
                    child: Container(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Sales Balance "),
                            SizedBox(
                              height: 5,
                            ),
                            Text(
                              "\$1,57,876",
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 20),
                            ),
                            SizedBox(
                              height: 5,
                            ),
                          ],
                        ),
                      ),
                      decoration: BoxDecoration(
                          color: Colors.lightGreen,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade200)),
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: Container(
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Total Investments "),
                            SizedBox(
                              height: 5,
                            ),
                            Text(
                              "0",
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 20),
                            ),
                            SizedBox(
                              height: 5,
                            ),
                          ],
                        ),
                      ),
                      decoration: BoxDecoration(
                          color: Colors.limeAccent,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: Colors.grey.shade200)),
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 15,
              ),
              Text(
                "Season Wise Batch Performance ",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              SizedBox(
                height: 15,
              ),
              // SizedBox(
              //     height: 300,
              //     width: MediaQuery.of(context).size.width,
              //     child: LineChartWidget()), // Line Graph
              SizedBox(height: 20),
              Text(
                "Season Performance ",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
    
              SizedBox(height: 20),
              // SizedBox(height: 300, child: BarChartWidget()), // Bar Graph
              SizedBox(height: 20),
              Text(
                "Rental farm Income and Expenditure ",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
    
              SizedBox(height: 20),
              // SizedBox(height: 300, child: BarChartWidget()), // Bar Graph
              SizedBox(height: 20),
              Text(
                "Egg Settings ",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
    
              SizedBox(height: 20),
              // SizedBox(height: 300, child: BarChartWidget()), // Bar Graph
            ],
          ),
        ),
      ),
    );
  }
}

// class LineChartWidget extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return LineChart(
//       LineChartData(
//         gridData: FlGridData(show: false),
//         titlesData: FlTitlesData(show: true),
//         borderData: FlBorderData(show: true),
//         lineBarsData: [
//           LineChartBarData(
//             spots: [
//               FlSpot(0, 1),
//               FlSpot(1, 3),
//               FlSpot(2, 2),
//               FlSpot(3, 1.5),
//               FlSpot(4, 4),
//               FlSpot(5, 3),
//             ],
//             isCurved: true,
//             barWidth: 4,
//             dotData: FlDotData(show: false),
//           ),
//         ],
//       ),
//     );
//   }
// }

// // Pie Chart
// class PieChartWidget extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return PieChart(
//       PieChartData(
//         sections: [
//           PieChartSectionData(
//               value: 40, title: "40%", color: Colors.red, radius: 50),
//           PieChartSectionData(
//               value: 30, title: "30%", color: Colors.green, radius: 50),
//           PieChartSectionData(
//               value: 20, title: "20%", color: Colors.blue, radius: 50),
//           PieChartSectionData(
//               value: 10, title: "10%", color: Colors.orange, radius: 50),
//         ],
//       ),
//     );
//   }
// }

// // Bar Graph
// class BarChartWidget extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return BarChart(
//       BarChartData(
//         barGroups: [
//           BarChartGroupData(
//               x: 1, barRods: [BarChartRodData(toY: 8, color: Colors.blue)]),
//           BarChartGroupData(
//               x: 2, barRods: [BarChartRodData(toY: 10, color: Colors.green)]),
//           BarChartGroupData(
//               x: 3, barRods: [BarChartRodData(toY: 6, color: Colors.red)]),
//           BarChartGroupData(
//               x: 4, barRods: [BarChartRodData(toY: 12, color: Colors.orange)]),
//         ],
//       ),
//     );
//   }
// }
