import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/constants.dart';
import 'package:farmora/utils/sizeutils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Choosepackage extends StatefulWidget {
  const Choosepackage({super.key});

  @override
  State<Choosepackage> createState() => _ChoosepackageState();
}

class _ChoosepackageState extends State<Choosepackage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().whiteColor,
      appBar: AppBar(
        backgroundColor: ColorUtils().whiteColor,
        title: Text(
          "Choose package",
          style:
              TextStyle(fontSize: appbarText, color: ColorUtils().blackColor),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: 10,
            ),
            Center(
              child: Text(
                "Subscribe and enjoy the premium features of our app",
                textAlign: TextAlign.center,
                style: TextStyle(color: ColorUtils().blackColor),
              ),
            ),
            SizedBox(
              height: 30,
            ),
            Text(
              "AVAILABLE PLANS",
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: ColorUtils().blackColor,
                  fontSize: titleSize),
            ),
            SizedBox(
              height: 10,
            ),
            Consumer<Packageprovider>(builder: (context, provider, _) {
              return Visibility(
                visible: provider.packages.isNotEmpty,
                child: provider.packages["data"] != null
                    ? Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ListView.builder(
                          itemCount: provider.packages["data"].length,
                          shrinkWrap: true,
                          physics: NeverScrollableScrollPhysics(),
                          itemBuilder: (context, index) {
                            var package = provider.packages["data"][index];
                            return Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: InkWell(
                                onTap: () {
                                  package["selected"] = !package["selected"];
                                  setState(() {});
                                },
                                child: Container(
                                    child: Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Expanded(
                                                flex: 10,
                                                child: Text(
                                                  package["name"],
                                                  style: TextStyle(
                                                      color:
                                                          ColorUtils().whiteColor,
                                                      fontWeight: FontWeight.bold,
                                                      fontSize: packageFont),
                                                ),
                                              ),
                                              Spacer(),
                                              Icon(
                                                package["selected"]
                                                    ? Icons.check_box_rounded
                                                    : Icons.square,
                                                color: ColorUtils().whiteColor,
                                              )
                                            ],
                                          ),
                                          Divider(
                                            color: Colors.grey.shade100
                                                .withOpacity(.5),
                                          ),
                                          Text(
                                            package["description"],
                                            style: TextStyle(
                                                color: ColorUtils().whiteColor),
                                          ),
                                          SizedBox(
                                            height: 10,
                                          ),
                                         
                                          Divider(
                                            color: Colors.grey.shade100
                                                .withOpacity(.5),
                                          ),
                                          IntrinsicHeight(
                                            child: Row(
                                              children: [
                                                Expanded(
                                                  child: Column(
                                                    children: [
                                                      Text(
                                                        rupeeSymbol +
                                                            package["price"],
                                                        style: TextStyle(
                                                            fontSize: packageFont,
                                                            color: ColorUtils()
                                                                .whiteColor,
                                                            fontWeight:
                                                                FontWeight.bold),
                                                      ),
                                                      Text(
                                                        package["duration"]
                                                                .toString() +
                                                            " days",
                                                        style: TextStyle(
                                                            fontSize: description,
                                                            color: ColorUtils()
                                                                .whiteColor),
                                                      )
                                                    ],
                                                  ),
                                                ),
                                                VerticalDivider(),
                                                Expanded(
                                                    child: Text(
                                                  "Inclusive of all taxes ",
                                                  textAlign: TextAlign.center,
                                                  style: TextStyle(
                                                      color:
                                                          ColorUtils().whiteColor,
                                                      fontSize: description),
                                                ))
                                              ],
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                    decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(10),
                                        gradient: LinearGradient(
                                          begin: Alignment.topLeft,
                                          end: Alignment.bottomRight,
                                          colors: [
                                            ColorUtils()
                                                .primaryColor
                                                .withOpacity(.8),
                                            // ColorUtils().whiteColor,
                                            ColorUtils()
                                                .blackColor
                                                .withOpacity(.8)
                                          ],
                                        ))),
                              ),
                            );
                          },
                        ),
                      )
                    : SizedBox(),
              );
            })
          ],
        ),
      ),
    );
  }
}
