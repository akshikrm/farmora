import 'dart:developer';

import 'package:farmora/utils/webService.dart';
import 'package:flutter/material.dart';
import 'package:farmora/repo/seasonsRepository.dart';

class SeasonsProvider extends ChangeNotifier {
  final _repository = SeasonsRepository();
  List<Map<String, dynamic>> _seasons = [];
  Map<String, dynamic>? _seasonOverviewData;
  bool _loading = false;
  bool _loadingOverview = false;
  String? _error;

  List<Map<String, dynamic>> get seasons => _seasons;
  Map<String, dynamic>? get seasonOverviewData => _seasonOverviewData;
  bool get loading => _loading;
  bool get loadingOverview => _loadingOverview;
  String? get error => _error;

  Future<void> loadSeasons() async {
    try {
      _loading = true;
      _error = null;
      notifyListeners();

      final response = await _repository.getAllSeasons();
      log("response for load season is $response");

      if (response['status'] == 'success') {
        _seasons = List<Map<String, dynamic>>.from(response["data"]["data"]);
      } else {
        _error = response['message'] ?? 'Failed to load seasons';
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> loadSeasonOverview(int seasonId) async {
    try {
      _loadingOverview = true;
      _error = null;
      _seasonOverviewData = null;
      notifyListeners();

      final response = await _repository.getSeasonOverview(seasonId);
      log("response for season overview: $response");

      if (response['status'] == 'success') {
        _seasonOverviewData = response['data'];
      } else {
        _error = response['message'] ?? 'Failed to load season overview';
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _loadingOverview = false;
      notifyListeners();
    }
  }

  Future<bool> addSeason(Map<String, dynamic> seasonData) async {
    try {
      _loading = true;
      _error = null;
      notifyListeners();

      final response = await _repository.createSeason(seasonData);
      log("Response from add season is $response");

      if (response['success'] == true) {
        await loadSeasons(); // Refresh the list
        return true;
      } else {
        _error = response['message'] ?? 'Failed to add season';
        return false;
      }
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<bool> updateSeason(int id, Map<String, dynamic> seasonData) async {
    try {
      _loading = true;
      _error = null;
      notifyListeners();

      final response = await _repository.updateSeason(id, seasonData);

      if (response['success'] == true) {
        await loadSeasons(); // Refresh the list
        return true;
      } else {
        _error = response['message'] ?? 'Failed to update season';
        return false;
      }
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<bool> deleteSeason(int id) async {
    try {
      _loading = true;
      _error = null;
      notifyListeners();

      final response = await _repository.deleteSeason(id);

      if (response['success'] == true) {
        await loadSeasons(); // Refresh the list
        return true;
      } else {
        _error = response['message'] ?? 'Failed to delete season';
        return false;
      }
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }
}
