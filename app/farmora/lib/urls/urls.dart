class Urls {
  static const String baseUrl = "https://farmora-api.akshikrm.com/";
  static const String loginUrl = "api/auth/login";
  static const String signUp = "api/auth/signup";
  static const String packages = "api/packages";

  //new APIs
  static const String farms = "api/farms";
  static const String seasons = "api/seasons";
  static const String batches = "api/batches";
  static const String users = "api/users";
  static const String roles = "api/roles";
  static const String permissions = "api/permissions";
  static const String vendors = "api/vendors";
  static const String vendorDropdown = "api/vendors/names";
  static const String categoriesDropdown = "api/items/categories/names";
  static const String batchesDropdown = "api/batches/names";
  static const String items = "api/items";
  static const String categoriesListing = "api/items/categories";
  static const String itemReturns = "api/item-returns";
  static const String purchaseBook = "api/items/purchase-book";
  static const String integrationBook = "api/integration-book";
  static const String workingCost = "api/working-costs";
  static const String sales = "api/sales";
  static const String generalExpenses = "api/general-expenses";
  static const String generalSales = "api/general-sales";
  static const String batchOverview = "api/overview/batch";
  static const String seasonOverview = "api/overview/season";
  static const String managerDashboard = "api/dashboard/manager";
  static const String adminDashboard = "api/dashboard/admin";
  static const String balanceSheet = "api/balance-sheet";

  static const String invoiceNumber = "api/invoice";
  // Filtered names
  static const String itemsByVendor = "api/items/categories/names/"; // Append vendorId
  static const String batchesBySeason = "api/batches/names?season_id="; // Append seasonId
}
