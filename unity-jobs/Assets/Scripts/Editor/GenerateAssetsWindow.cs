using UnityEngine;
using UnityEditor;

public class GenerateAssetsWindow : EditorWindow
{
    [MenuItem("Window/GenerateAssetBundle")]
    public static void ShowWindow()
    {
        GetWindow<GenerateAssetsWindow>("Generate Asset Bundle");
    }

    private void OnGUI()
    {
        if (GUILayout.Button("Generate Prefab"))
        {
            GeneratePrefab();
        }
    }

    private void GeneratePrefab()
    {
        GenerateAssetBundle.CreatePrefab();
    }
}