const Widget = require('/Users/daniyalnawaz/Desktop/aufgabe/Tecomon-Aufgabe/backend/models/widgetModel.js');


export const getAllWidgets = async () => {
    try {
      // 1. Fetch widgets with lean() for better performance
      const widgets = await Widget.find({});
      
      // 2. Validate we got results (empty array is valid)
      if (!Array.isArray(widgets)) {
        throw new Error('Invalid widget data format received from database');
      }
  
      // 3. Return formatted response
      return {
        success: true,
        count: widgets.length,
        data: widgets
      };
  
    } catch (error) {
      console.error('Database error in getAllWidgets:', error);
      
      
      throw new Error(`Failed to retrieve widgets: ${error.message}`);
    }
  };

export const deleteWidgetById = async (id) => {
    try {
      // Validate ID
      if (!id) {
        throw new Error('Widget ID is required');
      }
  
      // Delete the widget
      const result = await Widget.deleteOne({ id: id });
  
      // Check if document was actually deleted
      if (result.deletedCount === 0) {
        throw new Error('Widget not found or already deleted');
      }
  
      // Return success status and deleted count
      return {
        success: true,
        deletedCount: result.deletedCount,
        message: 'Widget deleted successfully'
      };
  
    } catch (error) {
      console.error('Error deleting widget:', error);
      
      // Return error information
      return {
        success: false,
        message: error.message || 'Failed to delete widget'
      };
    }
  };


  export const addWidget = async (widget) => {
    try {
      // Input validation
      if (!widget || !widget.id) {
        throw new Error('Invalid widget data: must be an object');
      }
      // Return success response
      return {
        success: true,
        data: widget,
        message: 'Widget created successfully'
      };
  
    } catch (error) {
      console.error('Error creating widget:', error);
      
      // Return error response
      return {
        success: false,
        message: error.message || 'Failed to create widget',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      };
    }
  };