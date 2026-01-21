import 'package:farmora/providers/base_provider.dart';
import 'package:flutter/material.dart';
import '../repositories/dashboard_repository.dart';

class DashboardProvider extends ChangeNotifier with BaseProvider {
  final DashboardRepository _repository = DashboardRepository();
  Map<String, dynamic>? _dashboardData;
  String? _userType;

  Map<String, dynamic>? get dashboardData => _dashboardData;
  String? get userType => _userType;

  void setUserType(String? type) {
    _userType = type;
    notifyListeners();
  }

  Future<void> fetchDashboardData() async {
    if (_userType == null) return;

    setLoading(true);
    clearErrors();

    try {
      final response = _userType == 'admin'
          ? await _repository.fetchAdminDashboard()
          : await _repository.fetchManagerDashboard();

      if (response['status'] == 'success') {
        var data = response['data'] as Map<String, dynamic>;

        // Transform admin stats into metrics for HorizontalCard if admin
        if (_userType == 'admin' && data['stats'] != null) {
          final stats = data['stats'];
          data['metrics'] = [
            {
              'label': 'Total Revenue',
              'value': stats['totalRevenue'],
              'color': 'emerald',
              'trend': 0,
            },
            {
              'label': 'Total Orders',
              'value': stats['totalOrders'],
              'color': 'blue',
              'trend': 0,
            },
            {
              'label': 'Active Batches',
              'value': stats['activeBatches'],
              'color': 'amber',
              'trend': 0,
            },
            {
              'label': 'Total Items',
              'value': stats['totalItems'],
              'color': 'rose',
              'trend': 0,
            },
          ];
        }

        _dashboardData = data;
      } else {
        setError(response['message'] ?? 'Failed to fetch dashboard data');
      }
    } catch (e) {
      setError(e.toString());
    } finally {
      setLoading(false);
      notifyListeners();
    }
  }
}
