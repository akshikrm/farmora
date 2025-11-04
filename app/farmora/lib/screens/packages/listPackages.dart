import 'package:farmora/providers/packages/packageProvider.dart';
import 'package:farmora/screens/authentication/loginPage.dart';
import 'package:farmora/screens/packages/addPackage.dart';
import 'package:farmora/utils/colors.dart';
import 'package:farmora/utils/customUtils.dart';
import 'package:farmora/utils/navigationUtils.dart';
import 'package:farmora/utils/sizeutils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ListPackages extends StatefulWidget {
  const ListPackages({super.key});

  @override
  State<ListPackages> createState() => _ListPackagesState();
}

class _ListPackagesState extends State<ListPackages> {
  ScrollController? _scrollController;
  int page = 1;
  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _scrollController!.addListener(_onScroll);

    refresh();
  }

  Future<void> _onScroll() async {
    if (_scrollController!.position.pixels ==
        _scrollController!.position.maxScrollExtent) {
      // Reached the right end
      page = page + 1;
      context.read<Packageprovider>().fetchPackages(page);
      print("Reached the end of the list");
    }
  }

  refresh() {
    Future.delayed(Duration(seconds: 0), () {
      context.read<Packageprovider>().fetchPackages(page);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorUtils().whiteColor,
      appBar: AppBar(
        title: Text(
          "Packages",
          style: TextStyle(fontSize: appbarText),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Consumer<Packageprovider>(builder: (context, provider, _) {
          return SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              children: [
                Visibility(
                  visible: provider.packages.isNotEmpty,
                  child: provider.packages["data"] != null
                      ? ListView.builder(
                          shrinkWrap: true,
                          itemCount: provider.packages["data"].length,
                          physics: NeverScrollableScrollPhysics(),
                          itemBuilder: (context, index) {
                            var package = provider.packages["data"][index];
                            return Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Container(
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Text(
                                            "Package Name : ",
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold),
                                          ),
                                          Expanded(
                                              flex: 10,
                                              child: Text(package["name"])),
                                          Spacer(),
                                          PopupMenuButton(
                                            color: ColorUtils().whiteColor,
                                            iconSize: 15,
                                            itemBuilder: (context) {
                                              return [
                                                PopupMenuItem(
                                                    onTap: ()async {
                                                      await context
                                                          .read<
                                                              Packageprovider>()
                                                          .editPackage(
                                                              package["name"],
                                                              package[
                                                                  "description"],
                                                              package["price"],
                                                              package[
                                                                  "duration"],
                                                              package["id"],!package["status"]);
                                                              refresh();
                                                    },
                                                    child: Text(
                                                        "Make Package ${package["status"]==false ? "Active":"Inactive"}")),
                                                PopupMenuItem(
                                                    onTap: () {
                                                      NavigationUtils
                                                          .navigateTo(
                                                              context,
                                                              AddPackage(
                                                                isEdit: true,
                                                                id: package[
                                                                    "id"],
                                                              )).then(
                                                        (value) {
                                                          page = 1;
                                                          refresh();
                                                        },
                                                      );
                                                    },
                                                    child: Text("Edit")),
                                                PopupMenuItem(
                                                    onTap: () {
                                                      showDialog(
                                                        context: context,
                                                        builder: (context) {
                                                          return AlertDialog(
                                                            title: Text(
                                                                "Confirm Delete"),
                                                            content: Text(
                                                                "Are you sure you want to delete this package ?"),
                                                            actions: [
                                                              TextButton(
                                                                  onPressed:
                                                                      () async {
                                                                    await context
                                                                        .read<
                                                                            Packageprovider>()
                                                                        .deletePackage(
                                                                            package["id"]);
                                                                    hideLoading();
                                                                    refresh();
                                                                  },
                                                                  child: Text(
                                                                      "Yes")),
                                                              TextButton(
                                                                  onPressed:
                                                                      () {
                                                                    hideLoading();
                                                                  },
                                                                  child: Text(
                                                                      "No"))
                                                            ],
                                                          );
                                                        },
                                                      );
                                                    },
                                                    child: Text("Delete"))
                                              ];
                                            },
                                          )
                                        ],
                                      ),
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Text(
                                        package["description"],
                                        style: TextStyle(
                                          fontSize: description,
                                        ),
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Text(
                                        "Price INR " +
                                            package["price"].toString() +
                                            " for ${package["duration"]} days",
                                        style: TextStyle(
                                            fontSize: titleSize,
                                            fontWeight: FontWeight.bold),
                                      ),
                                      SizedBox(
                                        height: 15,
                                      ),
                                      Text(
                                        "Status : ${package["status"] ? "ACTIVE" : "INACTIVE"}",
                                        style: TextStyle(
                                            color: package["status"]
                                                ? ColorUtils().primaryColor
                                                : Colors.red,
                                            fontWeight: FontWeight.bold),
                                      )
                                    ],
                                  ),
                                ),
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(
                                        color: ColorUtils()
                                            .primaryColor
                                            .withOpacity(.2))),
                              ),
                            );
                          },
                        )
                      : SizedBox(),
                ),
                Visibility(
                    visible: provider.loading,
                    child: Center(child: CircularProgressIndicator())),
                SizedBox(
                  height: 100,
                )
              ],
            ),
          );
        }),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(8.0),
        child: CustomButton(
            text: "Add Package",
            onPressed: () {
              NavigationUtils.navigateTo(
                  context,
                  AddPackage(
                    isEdit: false,
                    id: -1,
                  )).then(
                (value) {
                  page = 1;
                  refresh();
                },
              );
            },
            color: ColorUtils().primaryColor),
      ),
    );
  }
}
