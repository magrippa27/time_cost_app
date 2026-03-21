<?php

namespace App\Http\Controllers;

use App\Services\TimeInflationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TimeInflationController extends Controller
{
    public function data(Request $request, TimeInflationService $service): JsonResponse
    {
        $validated = $request->validate([
            'country' => ['required', 'string', 'min:2', 'max:3'],
            'hoursPerDay' => ['required', 'numeric', 'gt:0'],
            'yearsEnd' => ['sometimes', 'integer', 'gte:1900', 'lte:2100'],
        ]);

        $country = (string) $validated['country'];
        $hoursPerDay = (float) $validated['hoursPerDay'];
        $yearsEnd = isset($validated['yearsEnd']) ? (int) $validated['yearsEnd'] : 2024;

        try {
            $result = $service->calculate($country, $hoursPerDay, $yearsEnd);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to compute time-inflation data.',
                'debug' => app()->isLocal() ? $e->getMessage() : null,
            ], 500);
        }

        $status = ($result['success'] ?? false) ? 200 : 422;
        return response()->json($result, $status);
    }
}

