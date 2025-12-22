import 'dart:developer';

import 'package:farmora/providers/base_provider.dart';
import 'package:farmora/repo/items/itemRepo.dart';
import 'package:flutter/material.dart';

class ItemsProvider extends ChangeNotifier with BaseProvider {
  List<Map<String, dynamic>> _items = [];

  List<Map<String, dynamic>> get items => _items;

  // Mock categories - replace with actual API call when available
  List<Map<String, dynamic>> _categories = [];

  List<Map<String, dynamic>> get categories => _categories;

  Future<void> loadItems() async {
    setLoading(true);
    try {
      final response = await Itemrepo().getAllItems();
      _items = List<Map<String, dynamic>>.from(response["data"]["data"]);
      setError(null);
      notifyListeners();
    } catch (e) {
      setError('Error loading items: $e');
    } finally {
      setLoading(false);
    }
  }

  Future<bool> addItem(Map<String, dynamic> itemData) async {
    setLoading(true);
    try {
      final response = await Itemrepo().createItem(itemData);
      if (response['status'] == 'success') {
        await loadItems();
        return true;
      } else {
        setValidationErrors(response["error"]);
        return false;
      }
    } catch (e) {
      setError('Error adding item: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  Future<bool> addCategory(Map<String, dynamic> itemData) async {
    setLoading(true);
    try {
      final response = await Itemrepo().createCategory(itemData);
      if (response['status'] == 'success') {
        await loadCategories();
        return true;
      } else {
        setValidationErrors(response["error"]);
        return false;
      }
    } catch (e) {
      setError('Error adding item: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  Future<bool> updateItem(int id, Map<String, dynamic> itemData) async {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      await Future.delayed(Duration(milliseconds: 500));
      return true;
    } catch (e) {
      setError('Error updating item: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  Future<bool> updateCategory(int id, Map<String, dynamic> itemData) async {
    setLoading(true);
    try {
      final response = await Itemrepo().updateCategory(id, itemData);
      if (response['status'] == 'success') {
        await loadCategories();
        return true;
      } else {
        setValidationErrors(response["error"]);
        return false;
      }
    } catch (e) {
      setError('Error updating item: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  Future<bool> deleteItem(int id) async {
    setLoading(true);
    try {
      final response = await Itemrepo().deleteItem(id);
      if (response['status'] == 'success') {
        await loadItems();
        return true;
      } else {
        setError(response['message'] as String? ?? 'Failed to delete item');
        return false;
      }
    } catch (e) {
      setError('Error deleting item: $e');
      return false;
    } finally {
      setLoading(false);
    }
  }

  Future<void> loadCategories() async {
    setLoading(true);
    try {
      final response = await Itemrepo().getCategories();

      _categories = List<Map<String, dynamic>>.from(response["data"]["data"]);
      log("categories are $_categories");
      setError(null);
      notifyListeners();
    } catch (e) {
      setError('Error loading categories: $e');
    } finally {
      setLoading(false);
    }
  }
}
